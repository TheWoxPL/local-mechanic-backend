import { Document } from 'mongoose';
export declare class Currency extends Document {
    name: string;
}
export declare const CurrencySchema: import("mongoose").Schema<Currency, import("mongoose").Model<Currency, any, any, any, Document<unknown, any, Currency> & Currency & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Currency, Document<unknown, {}, import("mongoose").FlatRecord<Currency>> & import("mongoose").FlatRecord<Currency> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
