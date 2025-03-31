import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TimeUnit extends Document {
  @Prop({ required: true, unique: true })
  name!: string;
}

export const TimeUnitSchema = SchemaFactory.createForClass(TimeUnit);
