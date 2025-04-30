import { Model } from 'mongoose';
import { Currency } from '../../../models/currency.model';
import { CurrencyDTO } from '../dtos/currency.dto';
import { ServiceAvailability, ServiceUnit, TimeUnit } from 'src/models';
import { ServiceUnitDTO } from '../dtos/service-unit.dto';
import { ServiceAvailabilityDTO, TimeUnitDTO } from '../dtos';
export declare class StaticDataService {
    private readonly currencyModel;
    private readonly serviceUnitModel;
    private readonly serviceAvailabilityModel;
    private readonly timeUnitModel;
    constructor(currencyModel: Model<Currency>, serviceUnitModel: Model<ServiceUnit>, serviceAvailabilityModel: Model<ServiceAvailability>, timeUnitModel: Model<TimeUnit>);
    findAllCurrencies(): Promise<CurrencyDTO[]>;
    findAllServiceUnits(): Promise<ServiceUnitDTO[]>;
    findAllServiceAvailabilities(): Promise<ServiceAvailabilityDTO[]>;
    findAllTimeUnits(): Promise<TimeUnitDTO[]>;
}
