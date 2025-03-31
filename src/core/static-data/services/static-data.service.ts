import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Currency } from '../../../models/currency.model';
import { CurrencyDTO } from '../dtos/currency.dto';
import { plainToClass } from 'class-transformer';
import { ServiceUnit } from 'src/models';
import { ServiceUnitDTO } from '../dtos/service-unit.dto';

@Injectable()
export class StaticDataService {
  constructor(
    @InjectModel(Currency.name) private readonly currencyModel: Model<Currency>,
    @InjectModel(ServiceUnit.name)
    private readonly serviceUnitModel: Model<ServiceUnit>
  ) {}

  async findAllCurrencies(): Promise<CurrencyDTO[]> {
    const currencies = await this.currencyModel.find().exec();
    return currencies.map((currency) =>
      plainToClass(CurrencyDTO, currency.toObject(), {
        excludeExtraneousValues: true
      })
    );
  }

  async findAllServiceUnits(): Promise<ServiceUnitDTO[]> {
    const serviceUnits = await this.serviceUnitModel.find().exec();
    return serviceUnits.map((serviceUnit) =>
      plainToClass(ServiceUnitDTO, serviceUnit.toObject(), {
        excludeExtraneousValues: true
      })
    );
  }
}
