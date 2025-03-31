import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, HydratedDocument, Model, RootFilterQuery } from 'mongoose';
import { Types } from 'mongoose';
import { UserAccount, Role, Currency, ServiceUnit } from '../models';
import { AppPermissions, RoleType } from 'src/libs';
import { UserAccountDto } from 'src/core/accounts/dtos';
import { plainToClass } from 'class-transformer';
import { DefaultData } from './defaultData';

@Injectable()
export class UpsertDefaultsService implements OnModuleInit {
  private systemAccount?: HydratedDocument<UserAccount>;
  private adminAccount?: HydratedDocument<UserAccount>;

  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(UserAccount.name)
    private readonly userAccountModel: Model<UserAccount>,
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
    @InjectModel(Currency.name)
    private readonly currencyModel: Model<Currency>,
    @InjectModel(ServiceUnit.name)
    private readonly serviceUnitModel: Model<ServiceUnit>
  ) {
    Logger.debug('[UpsertDefaultsService] Constructor called');
  }

  async onModuleInit(): Promise<void> {
    Logger.debug('[UpsertDefaultsService] OnModuleInit called');
    await this.upsertDefaultModels();
    await this.upsertSystemAccount();
    await this.createRoles();
    await this.upsertAdminAccount();
    await this.upsertDefaultData();
  }

  private async upsertDocuments<T>(
    model: Model<T>,
    documents: Partial<T>[],
    uniqueKey: keyof T
  ): Promise<void> {
    for (const document of documents) {
      const query: RootFilterQuery<T> = {
        [uniqueKey]: document[uniqueKey]
      } as RootFilterQuery<T>;
      const existingDocument = await model.findOne(query).exec();

      if (!existingDocument) {
        await model.create(document);
        Logger.debug(
          `[UpsertService] Document added: ${JSON.stringify(document)}`
        );
      } else {
        Logger.debug(
          `[UpsertService] Document already exists: ${JSON.stringify(document)}`
        );
      }
    }
  }

  private async upsertDefaultData(): Promise<void> {
    const collections = [
      {
        model: this.currencyModel,
        data: DefaultData.currencies,
        uniqueKey: 'name' as keyof Currency
      },
      {
        model: this.serviceUnitModel,
        data: DefaultData.serviceUnits,
        uniqueKey: 'name' as keyof ServiceUnit
      }
    ];

    for (const { model, data, uniqueKey } of collections) {
      await this.upsertDocuments(model, data, uniqueKey);
    }
  }

  private async upsertDefaultModels(): Promise<void> {
    try {
      const dbName = process.env.MONGODB_DATABASE;
      if (!dbName) {
        throw new Error(
          'Database name is not defined in environment variables'
        );
      }

      const db = this.connection.useDb(dbName, {
        useCache: true
      });
      if (!db.db) {
        throw new Error('Database connection is not established');
      }

      const collections = await db.db.listCollections().toArray();
      const collectionNames = Object.keys(DefaultData);

      for (const collectionName of collectionNames) {
        if (
          !collections.some((collection) => collection.name === collectionName)
        ) {
          await db.createCollection(collectionName);
          Logger.debug(`[UpsertService] Collection ${collectionName} created.`);
        }
      }
    } catch (error) {
      Logger.error(`[UpsertService] Error during upsertDefaults: ${error}`);
      throw error;
    }
  }

  private async upsertSystemAccount(): Promise<HydratedDocument<UserAccount>> {
    if (!this.systemAccount) {
      const username = 'SYSTEM';
      let systemAccount = await this.userAccountModel
        .findOne({ username })
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
      let adminAccount = await this.userAccountModel
        .findOne({ username })
        .exec();

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

  async getSystemAccount(): Promise<UserAccountDto> {
    const systemAccount = await this.upsertSystemAccount();
    return plainToClass(UserAccountDto, systemAccount, {
      excludeExtraneousValues: true
    });
  }

  private async createRoleIfNotExists(
    name: string,
    permissions: { action: string; subject: string }[]
  ): Promise<void> {
    const role = await this.roleModel.findOne({ name });
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
    return this.roleModel.findOne({ name: RoleType.CUSTOMER }).exec();
  }

  async getEntrepreneurRole(): Promise<HydratedDocument<Role> | null> {
    return this.roleModel.findOne({ name: RoleType.ENTREPRENEUR }).exec();
  }

  async getAdminRole(): Promise<HydratedDocument<Role> | null> {
    return this.roleModel.findOne({ name: RoleType.ADMIN }).exec();
  }
}
