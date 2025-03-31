import { Module } from '@nestjs/common';
import { StaticDataController } from './controllers/static-data.controller';
import { StaticDataService } from './services/static-data.service';
import {
  Currency,
  CurrencySchema,
  ServiceUnit,
  ServiceUnitSchema
} from 'src/models';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Currency.name, schema: CurrencySchema },
      { name: ServiceUnit.name, schema: ServiceUnitSchema }
    ])
  ],
  controllers: [StaticDataController],
  providers: [StaticDataService]
})
export class StaticDataModule {}
