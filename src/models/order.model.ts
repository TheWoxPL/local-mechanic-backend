import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BaseClass } from './base.model';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

@Schema({ timestamps: true })
export class Order extends BaseClass {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAccount'
  })
  userId!: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  })
  serviceId!: string;

  @Prop({
    required: true,
    type: Date
  })
  scheduledDate!: Date;

  @Prop({
    type: String
  })
  notes?: string;

  @Prop({
    required: true,
    type: Number
  })
  price!: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
export type OrderDocument = Order & Document;
