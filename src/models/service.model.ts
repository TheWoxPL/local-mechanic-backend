import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BaseClass } from './base.model';

@Schema()
export class Service extends BaseClass {
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

  @Prop({
    required: false
  })
  imageUrl?: string;

  @Prop({
    required: true,
    default: 0
  })
  opinionCount!: number;

  @Prop({
    required: true,
    default: 0,
    min: 0,
    max: 5
  })
  averageRating!: number;

  @Prop({
    required: true,
    default: 0,
    min: 10,
    max: 10000
  })
  views!: number;

  @Prop({
    required: true,
    default: 0,
    min: 0,
    max: 100
  })
  orders!: number;

  @Prop({
    required: true,
    default: 0,
    min: 0,
    max: 100
  })
  favorites!: number;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
