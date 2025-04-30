import { Document } from 'mongoose';
export declare class ServiceAvailability extends Document {
    name: string;
}
export declare const ServiceAvailabilitySchema: import("mongoose").Schema<ServiceAvailability, import("mongoose").Model<ServiceAvailability, any, any, any, Document<unknown, any, ServiceAvailability> & ServiceAvailability & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ServiceAvailability, Document<unknown, {}, import("mongoose").FlatRecord<ServiceAvailability>> & import("mongoose").FlatRecord<ServiceAvailability> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
