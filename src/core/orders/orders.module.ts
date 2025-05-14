import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../../models/order.model';
import { ServiceSchema, Service } from 'src/models/service.model';
import { Company, CompanySchema } from 'src/models/company.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Service.name, schema: ServiceSchema },
      { name: Company.name, schema: CompanySchema }
    ])
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService]
})
export class OrdersModule {}
