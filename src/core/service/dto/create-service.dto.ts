import { Expose } from 'class-transformer';
import { BaseDto } from '../../../libs';

export class CreateServiceDTO extends BaseDto {
  @Expose()
  title!: string;

  @Expose()
  description!: string;

  @Expose()
  estimatedTime!: string;

  @Expose()
  timeUnitId!: string;

  @Expose()
  serviceAvailabilityId!: string;

  @Expose()
  price!: number;

  @Expose()
  currencyId!: string;

  @Expose()
  serviceUnitId!: string;

  @Expose()
  companyId!: string;
}
