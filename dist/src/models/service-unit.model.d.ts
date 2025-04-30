import { Document } from 'mongoose';
export declare class ServiceUnit extends Document {
    name: string;
}
export declare const ServiceUnitSchema: import("mongoose").Schema<ServiceUnit, import("mongoose").Model<ServiceUnit, any, any, any, Document<unknown, any, ServiceUnit> & ServiceUnit & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ServiceUnit, Document<unknown, {}, import("mongoose").FlatRecord<ServiceUnit>> & import("mongoose").FlatRecord<ServiceUnit> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
