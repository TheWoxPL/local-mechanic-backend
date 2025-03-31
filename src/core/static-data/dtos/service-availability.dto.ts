import { Expose } from 'class-transformer';
import { BaseDto } from '../../../libs';

export class ServiceAvailabilityDTO extends BaseDto {
  @Expose()
  id!: string;

  @Expose()
  name!: string;
}
