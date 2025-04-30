import mongoose from 'mongoose';
import { BaseClass } from './base.model';
export declare class Company extends BaseClass {
    companyName: string;
    description?: string;
    foundDate: Date;
    owners?: string;
    owner: string;
    verifiedOwners?: string[];
    workingHours?: {
        from: number;
        to: number;
    };
}
export declare const CompanySchema: mongoose.Schema<Company, mongoose.Model<Company, any, any, any, mongoose.Document<unknown, any, Company> & Company & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Company, mongoose.Document<unknown, {}, mongoose.FlatRecord<Company>> & mongoose.FlatRecord<Company> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
