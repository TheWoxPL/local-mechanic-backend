import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Service ID being ordered'
  })
  @IsNotEmpty()
  serviceId!: string;

  @ApiProperty({
    description: 'Scheduled date for the service',
    type: Date
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  scheduledDate!: Date;

  @ApiProperty({
    description: 'Any additional notes for the order',
    required: false
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({
    description: 'Price of the service'
  })
  @IsNumber()
  @IsNotEmpty()
  price!: number;
}
