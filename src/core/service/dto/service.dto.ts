import { Expose, Type } from 'class-transformer';
import { BaseDto } from '../../../libs';
import {
  CurrencyDTO,
  ServiceAvailabilityDTO,
  ServiceUnitDTO,
  TimeUnitDTO
} from 'src/core/static-data/dtos';
import { CompanyDTO } from 'src/core/companies/dtos/company.dto';

export class ServiceDTO extends BaseDto {
  @Expose()
  title!: string;

  @Expose()
  description?: string;

  @Expose()
  estimatedTime!: string;

  @Expose()
  @Type(() => TimeUnitDTO)
  timeUnit!: TimeUnitDTO;

  @Expose()
  @Type(() => ServiceAvailabilityDTO)
  serviceAvailability!: ServiceAvailabilityDTO;

  @Expose()
  price!: number;

  @Expose()
  @Type(() => CurrencyDTO)
  currency!: CurrencyDTO;

  @Expose()
  @Type(() => ServiceUnitDTO)
  serviceUnit!: ServiceUnitDTO;

  @Expose()
  @Type(() => CompanyDTO)
  company!: CompanyDTO;

  @Expose()
  isFavorite!: boolean;

  @Expose()
  imageUrl?: string;
}
