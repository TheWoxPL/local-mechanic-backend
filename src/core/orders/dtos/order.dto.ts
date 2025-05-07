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
  @Transform(({ obj }) => obj.id || obj._id?.toString())
  id!: string;

  @Expose()
  @IsNotEmpty()
  userId!: string;

  @Expose()
  @Type(() => ServiceDTO)
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
