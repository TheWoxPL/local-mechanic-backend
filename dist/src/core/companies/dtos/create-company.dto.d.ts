import { BaseDto } from '../../../libs';
export declare class CreateCompanyDTO extends BaseDto {
    companyName: string;
    description?: string;
    foundDate: Date;
    owners?: string;
    verifiedOwners: string[];
    workingHours: {
        from: number;
        to: number;
    };
}
