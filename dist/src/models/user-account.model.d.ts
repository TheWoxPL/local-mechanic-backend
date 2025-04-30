import mongoose from 'mongoose';
import { BaseClass } from './base.model';
export declare class UserAccount extends BaseClass {
    username: string;
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    email: string;
    role: string[];
}
export declare const UserAccountSchema: mongoose.Schema<UserAccount, mongoose.Model<UserAccount, any, any, any, mongoose.Document<unknown, any, UserAccount> & UserAccount & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, UserAccount, mongoose.Document<unknown, {}, mongoose.FlatRecord<UserAccount>> & mongoose.FlatRecord<UserAccount> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
