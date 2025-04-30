import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';
import { ServiceDTO } from 'src/core/service/dto';

export class OrderDto {
  @Expose()
  @Transform(({ obj }) => obj._id?.toString())
  id!: string;

  @Expose()
  @IsNotEmpty()
  userId!: string;

  @Expose()
  @Transform(({ obj }) => {
    if (obj.serviceId && typeof obj.serviceId === 'object') {
      return obj.serviceId;
    }
    return obj.serviceId;
  })
  service!: ServiceDTO;

  @Expose()
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  scheduledDate!: Date;

  @Expose()
  @IsString()
  @IsOptional()
  notes?: string;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  price!: number;
}
