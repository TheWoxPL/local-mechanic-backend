import { Expose } from 'class-transformer';

export class SearchSuggestionDto {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  category!: string;
}
