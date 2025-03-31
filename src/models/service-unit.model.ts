import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ServiceUnit extends Document {
  @Prop({ required: true, unique: true })
  name!: string;
}

export const ServiceUnitSchema = SchemaFactory.createForClass(ServiceUnit);
