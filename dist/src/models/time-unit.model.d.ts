import { Document } from 'mongoose';
export declare class TimeUnit extends Document {
    name: string;
}
export declare const TimeUnitSchema: import("mongoose").Schema<TimeUnit, import("mongoose").Model<TimeUnit, any, any, any, Document<unknown, any, TimeUnit> & TimeUnit & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TimeUnit, Document<unknown, {}, import("mongoose").FlatRecord<TimeUnit>> & import("mongoose").FlatRecord<TimeUnit> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
