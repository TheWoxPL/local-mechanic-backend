import { Expose } from 'class-transformer';
import { BaseDto } from '../../../libs';

export class UpdateCompanyDTO extends BaseDto {
  @Expose()
  companyName?: string;
  @Expose()
  description?: string;
  @Expose()
  foundDate?: Date;
  @Expose()
  owners?: string;
  @Expose()
  verifiedOwners?: string[];
  @Expose()
  workingHours?: {
    from: number;
    to: number;
  };
  @Expose()
  phoneNumber?: string;
  @Expose()
  address?: string;

  @Expose()
  opinionCount?: number;

  @Expose()
  averageRating?: number;
}
