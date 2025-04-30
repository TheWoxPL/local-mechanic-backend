import { BaseDto } from '../../../libs';
export declare class CreateServiceDTO extends BaseDto {
    title: string;
    description: string;
    estimatedTime: string;
    timeUnitId: string;
    serviceAvailabilityId: string;
    price: number;
    currencyId: string;
    serviceUnitId: string;
    companyId: string;
}
