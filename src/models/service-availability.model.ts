import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ServiceAvailability extends Document {
  @Prop({ required: true, unique: true })
  name!: string;
}

export const ServiceAvailabilitySchema =
  SchemaFactory.createForClass(ServiceAvailability);
