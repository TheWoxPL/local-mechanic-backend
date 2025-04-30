import { BaseDto } from '../../../libs';
import { UserAccountDto } from 'src/core/accounts/dtos';
export declare class CompanyDTO extends BaseDto {
    companyName: string;
    description?: string;
    foundDate: Date;
    owner: UserAccountDto;
    owners?: string;
    verifiedOwners: string[];
    workingHours: {
        from: number;
        to: number;
    };
}
