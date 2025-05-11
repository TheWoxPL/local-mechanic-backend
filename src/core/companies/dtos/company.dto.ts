import { Expose, Type } from 'class-transformer';
import { BaseDto } from '../../../libs';
import { UserAccountDto } from 'src/core/accounts/dtos';

export class CompanyDTO extends BaseDto {
  @Expose()
  companyName!: string;
  @Expose()
  description?: string;
  @Expose()
  foundDate!: Date;
  @Expose()
  @Type(() => UserAccountDto)
  owner!: UserAccountDto;
  @Expose()
  owners?: string;
  @Expose()
  verifiedOwners!: string[];
  @Expose()
  workingHours!: {
    from: number;
    to: number;
  };
  @Expose()
  imageUrl?: string;
}
