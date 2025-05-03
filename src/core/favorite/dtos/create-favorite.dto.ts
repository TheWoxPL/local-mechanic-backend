import { Expose } from 'class-transformer';

export class CreateFavoriteDTO {
  @Expose()
  serviceId!: string;

  @Expose()
  userId!: string;
}
