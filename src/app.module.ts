import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConnectionString } from './libs/';

import { MongooseModels } from './models';
import { AppController } from './app.controller';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard } from './libs/internal/guards/permissions.guard';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './core/companies/companies.module';
import { UpsertDefaultsModule } from './upsert-defaults/upsert-defaults.module';
import { StaticDataModule } from './core/static-data/static-data.module';
import { ServiceModule } from './core/service/service.module';
import { OrdersModule } from './core/orders/orders.module';
import { FavoriteModule } from './core/favorite/favorite.module';
import { SearchModule } from './core/search/search.module';

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
    UpsertDefaultsModule,
    AuthModule,
    CompaniesModule,
    StaticDataModule,
    ServiceModule,
    OrdersModule,
    FavoriteModule,
    SearchModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard
    }
  ],
  exports: []
})
export class AppModule {}
