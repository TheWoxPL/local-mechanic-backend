import { CurrencyDTO } from '../dtos/currency.dto';
import { StaticDataService } from '../services/static-data.service';
import { ServiceUnitDTO } from '../dtos/service-unit.dto';
import { ServiceAvailabilityDTO, TimeUnitDTO } from '../dtos';
export declare class StaticDataController {
    private readonly staticDataService;
    constructor(staticDataService: StaticDataService);
    getCurrencies(): Promise<CurrencyDTO[]>;
    getServiceUnits(): Promise<ServiceUnitDTO[]>;
    getServiceAvailabilities(): Promise<ServiceAvailabilityDTO[]>;
    getTimeUnits(): Promise<TimeUnitDTO[]>;
}
