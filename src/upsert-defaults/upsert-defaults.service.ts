import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {InjectConnection, InjectModel} from '@nestjs/mongoose';
import {plainToClass} from 'class-transformer';
import {Connection, HydratedDocument, Model} from 'mongoose';
import {UserAccountDto} from '../core/accounts/dtos';
import {MongooseModels, UserAccount, Role} from '../models';
import {Types} from 'mongoose';
import {AppPermissions, RoleType} from 'src/libs';

@Injectable()
export class UpsertDefaultsService implements OnModuleInit {
  private systemAccount?: HydratedDocument<UserAccount>;
  private adminAccount?: HydratedDocument<UserAccount>;

  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(UserAccount.name)
    private readonly userAccountModel: Model<UserAccount>,
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>
  ) {
    Logger.debug(
      '[UpsertDefaultsService] Constructor called--------------------------'
    );
  }

  async onModuleInit(): Promise<void> {
    Logger.debug(
      '[UpsertDefaultsService] OnModuleInit called----------------------------'
    );
    await this.upsertDefaults();
    await this.upsertSystemAccount();
    await this.createRoles();
    await this.upsertAdminAccount();
  }

  private getCollectionNames(models: typeof MongooseModels): string[] {
    const allNames = models.map((model) => model.collection);
    return allNames.filter((name) => name !== undefined);
  }

  private async upsertDefaults(): Promise<void> {
    try {
      const dbName = process.env.MONGODB_DATABASE;
      if (dbName === undefined) {
        throw new Error(
          'There is no database name in the environment variables'
        );
      }
      let collectionAdded = false;
      const db = this.connection.useDb(dbName, {useCache: true});
      if (db.db === undefined) {
        throw new Error(
          'There is no database connection. Check the connection string.'
        );
      }

      const collections = await db.db.listCollections().toArray();
      const collectionNames = this.getCollectionNames(MongooseModels);

      for (const collectionName of collectionNames) {
        if (
          !collections.some((collection) => collection.name === collectionName)
        ) {
          await db.createCollection(collectionName);
          collectionAdded = true;
        }
      }
      if (collectionAdded) {
        Logger.debug('[UpsertService] Database prepared.');
      }
    } catch (error) {
      Logger.debug(error);
    }
  }

  async getSystemAccount(): Promise<UserAccountDto> {
    const systemAccount = await this.upsertSystemAccount();
    return plainToClass(UserAccountDto, systemAccount, {
      excludeExtraneousValues: true
    });
  }

  private async upsertSystemAccount(): Promise<HydratedDocument<UserAccount>> {
    if (!this.systemAccount) {
      const username = 'SYSTEM';
      let systemAccount = await this.userAccountModel
        .findOne({username})
        .exec();

      if (!systemAccount) {
        systemAccount = new this.userAccountModel();
        systemAccount.username = username;
        systemAccount.updatedAt = new Date();
        systemAccount.createdAt = new Date();
        systemAccount.updatedBy = systemAccount.id;
        systemAccount.createdBy = systemAccount.id;
        systemAccount.email = 'system@local-mechanic-service.com';
        systemAccount.role = [];
        await systemAccount.save();
        Logger.debug('[UpsertService] System account added');
      }
      this.systemAccount = systemAccount;
    }
    return this.systemAccount;
  }

  private async upsertAdminAccount(): Promise<HydratedDocument<UserAccount>> {
    if (!this.adminAccount) {
      const username = 'ADMIN';
      let adminAccount = await this.userAccountModel.findOne({username}).exec();

      if (!adminAccount) {
        adminAccount = new this.userAccountModel();
        const adminRole = await this.getAdminRole();
        if (!adminRole) throw new Error('Admin role not found');
        adminAccount.username = username;
        adminAccount.updatedAt = new Date();
        adminAccount.createdAt = new Date();
        adminAccount.updatedBy = (await this.getSystemAccount()).id;
        adminAccount.createdBy = (await this.getSystemAccount()).id;
        adminAccount.role = [adminRole.id];
        adminAccount.email = 'admin@local-mechanic-service.com';
        await adminAccount.save();
        Logger.debug('[UpsertService] Default admin account added');
      }
      this.adminAccount = adminAccount;
    }
    return this.adminAccount;
  }

  private async createRoles(): Promise<void> {
    await this.createRoleIfNotExists(RoleType.ENTREPRENEUR, [
      AppPermissions.APP.DISPLAY
    ]);
    await this.createRoleIfNotExists(RoleType.CUSTOMER, [
      AppPermissions.APP.DISPLAY
    ]);
    await this.createRoleIfNotExists(RoleType.ADMIN, [AppPermissions.ADMIN]);
  }

  private async createRoleIfNotExists(
    name: string,
    permissions: {action: string; subject: string}[]
  ): Promise<void> {
    const role = await this.roleModel.findOne({name});
    if (!role) {
      const systemUser = new Types.ObjectId((await this.getSystemAccount()).id);
      const newRole = new this.roleModel({
        name,
        permissions,
        createdBy: systemUser,
        updatedBy: systemUser
      });
      await newRole.save();
      Logger.debug(`[UpsertService] Role ${name} created.`);
    } else {
      Logger.debug(`[UpsertService] Role ${name} already exists.`);
    }
  }
  async getCustomerRole(): Promise<HydratedDocument<Role> | null> {
    return this.roleModel.findOne({name: RoleType.CUSTOMER}).exec();
  }
  async getEntrepreneurRole(): Promise<HydratedDocument<Role> | null> {
    return this.roleModel.findOne({name: RoleType.ENTREPRENEUR}).exec();
  }
  async getAdminRole(): Promise<HydratedDocument<Role> | null> {
    return this.roleModel.findOne({name: RoleType.ADMIN}).exec();
  }
}
