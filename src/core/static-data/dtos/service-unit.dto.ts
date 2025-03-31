import { Expose } from 'class-transformer';
import { BaseDto } from '../../../libs';

export class ServiceUnitDTO extends BaseDto {
  @Expose()
  id!: string;

  @Expose()
  name!: string;
}
