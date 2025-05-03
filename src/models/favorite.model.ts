import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseClass } from './base.model';
import mongoose from 'mongoose';

@Schema()
export class Favorite extends BaseClass {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  })
  serviceId!: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAccount'
  })
  userId!: string;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
