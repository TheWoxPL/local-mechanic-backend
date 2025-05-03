import { Expose } from 'class-transformer';
import { BaseDto } from 'src/libs';

export class FavoriteDTO extends BaseDto {
  @Expose()
  id!: string;

  @Expose()
  serviceId!: string;

  @Expose()
  userId!: string;
}
