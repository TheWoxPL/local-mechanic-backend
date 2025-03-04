import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConnectionString } from './libs/';
import { UpsertDefaultsService } from './upsert-defaults/upsert-defaults.service';
import { MongooseModels } from './models';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: getMongoConnectionString(configService)
      })
    }),
    MongooseModule.forFeature(MongooseModels)
  ],
  controllers: [AppController],
  providers: [UpsertDefaultsService]
})
export class AppModule {}
