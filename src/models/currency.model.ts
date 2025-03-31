import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Currency extends Document {
  @Prop({required: true, unique: true})
  name!: string;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);
