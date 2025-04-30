import { BaseDto } from '../../../libs';
import { CurrencyDTO, ServiceAvailabilityDTO, ServiceUnitDTO, TimeUnitDTO } from 'src/core/static-data/dtos';
import { CompanyDTO } from 'src/core/companies/dtos/company.dto';
export declare class ServiceDTO extends BaseDto {
    title: string;
    description?: string;
    estimatedTime: string;
    timeUnit: TimeUnitDTO;
    serviceAvailability: ServiceAvailabilityDTO;
    price: number;
    currency: CurrencyDTO;
    serviceUnit: ServiceUnitDTO;
    company: CompanyDTO;
}
