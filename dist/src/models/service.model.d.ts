import mongoose, { Document } from 'mongoose';
export declare class Service extends Document {
    title: string;
    description: string;
    estimatedTime: string;
    timeUnit: string;
    serviceAvailability: string;
    price: number;
    currency: string;
    serviceUnit: string;
    company: string;
}
export declare const ServiceSchema: mongoose.Schema<Service, mongoose.Model<Service, any, any, any, mongoose.Document<unknown, any, Service> & Service & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Service, mongoose.Document<unknown, {}, mongoose.FlatRecord<Service>> & mongoose.FlatRecord<Service> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
