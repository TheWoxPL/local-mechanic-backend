import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConnectionString } from './libs/';
import { UpsertDefaultsService } from './upsert-defaults/upsert-defaults.service';
import { MongooseModels } from './models';
import { AppController } from './app.controller';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard } from './libs/internal/guards/permissions.guard';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './core/companies/companies.module';

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
    MongooseModule.forFeature(MongooseModels),
    AuthModule,
    CompaniesModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard
    },
    UpsertDefaultsService
  ],
  exports: [UpsertDefaultsService]
})
export class AppModule {}
