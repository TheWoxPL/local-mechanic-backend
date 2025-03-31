import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Currency } from '../../../models/currency.model';
import { CurrencyDTO } from '../dtos/currency.dto';
import { plainToClass } from 'class-transformer';
import { ServiceAvailability, ServiceUnit, TimeUnit } from 'src/models';
import { ServiceUnitDTO } from '../dtos/service-unit.dto';
import { ServiceAvailabilityDTO, TimeUnitDTO } from '../dtos';

@Injectable()
export class StaticDataService {
  constructor(
    @InjectModel(Currency.name) private readonly currencyModel: Model<Currency>,
    @InjectModel(ServiceUnit.name)
    private readonly serviceUnitModel: Model<ServiceUnit>,
    @InjectModel(ServiceAvailability.name)
    private readonly serviceAvailabilityModel: Model<ServiceAvailability>,
    @InjectModel(TimeUnit.name)
    private readonly timeUnitModel: Model<TimeUnit>
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

  async findAllServiceAvailabilities(): Promise<ServiceAvailabilityDTO[]> {
    const serviceAvailabilities = await this.serviceAvailabilityModel
      .find()
      .exec();
    return serviceAvailabilities.map((serviceAvailability) =>
      plainToClass(ServiceAvailabilityDTO, serviceAvailability.toObject(), {
        excludeExtraneousValues: true
      })
    );
  }

  async findAllTimeUnits(): Promise<TimeUnitDTO[]> {
    const timeUnits = await this.timeUnitModel.find().exec();
    return timeUnits.map((serviceAvailability) =>
      plainToClass(ServiceAvailabilityDTO, serviceAvailability.toObject(), {
        excludeExtraneousValues: true
      })
    );
  }
}
