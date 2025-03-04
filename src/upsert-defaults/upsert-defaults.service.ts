import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { MongooseModels } from '../models/index';

@Injectable()
export class UpsertDefaultsService implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit(): Promise<void> {
    await this.upsertDefaults();
  }

  private getCollectionNames(models: typeof MongooseModels): string[] {
    const allNames = models.map((model) => model.collection);
    return allNames.filter((name) => name !== undefined);
  }

  async upsertDefaults(): Promise<void> {
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
        // eslint-disable-next-line no-console
        Logger.debug('[UpserService] Database prepared.');
      }
    } catch (error) {
      Logger.debug(error);
    }
  }
}
