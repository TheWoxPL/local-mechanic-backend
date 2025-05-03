import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Service extends Document {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  estimatedTime!: string;

  @Prop({
    required: true,
    default: [],
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TimeUnit'
  })
  timeUnit!: string;

  @Prop({
    required: true,
    default: [],
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceAvailability'
  })
  serviceAvailability!: string;

  @Prop({ required: true })
  price!: number;

  @Prop({
    required: true,
    default: [],
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Currency'
  })
  currency!: string;

  @Prop({
    required: true,
    default: [],
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceUnit'
  })
  serviceUnit!: string;

  @Prop({
    required: true,
    default: [],
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  })
  company!: string;

  @Prop({
    required: true
  })
  isFavorite!: boolean;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
