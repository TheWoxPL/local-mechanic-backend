import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Connection, HydratedDocument, Model } from 'mongoose';
import { UserAccountDto } from '../core/accounts/dtos';
import { MongooseModels, UserAccount } from '../models';

@Injectable()
export class UpsertDefaultsService implements OnModuleInit {
  private systemAccount?: HydratedDocument<UserAccount>;

  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(UserAccount.name)
    private readonly userAccountModel: Model<UserAccount>
  ) {}

  async onModuleInit(): Promise<void> {
    await this.upsertDefaults();
    await this.upsertSystemAccount();
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
      const db = this.connection.useDb(dbName, { useCache: true });
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
        Logger.debug('[UpserService] Database prepared.');
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
        await systemAccount.save();
        Logger.debug('[UpserService] System account added');
      }
      this.systemAccount = systemAccount;
    }
    Logger.debug('[UpserService] System account exists in database');
    return this.systemAccount;
  }
}
