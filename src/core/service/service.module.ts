import { Module } from '@nestjs/common';
import { ServiceController } from './controllers/service.controller';
import { ServiceService } from './services/service.service';
import { CompaniesModule } from '../companies/companies.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Service, ServiceSchema } from 'src/models/service.model';
import { FavoriteModule } from '../favorite/favorite.module';
import { AuthModule } from 'src/auth/auth.module';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }]),
    CompaniesModule,
    FavoriteModule,
    AuthModule,
    OrdersModule
  ],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService]
})
export class ServiceModule {}
