import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BaseClass } from './base.model';

@Schema()
export class Company extends BaseClass {
  @Prop({ required: true })
  companyName!: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true, default: Date.now })
  foundDate!: Date;

  @Prop({ required: false })
  owners?: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAccount'
  })
  owner!: string;

  @Prop({
    required: false,
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'UserAccount'
  })
  verifiedOwners?: string[];

  @Prop({
    required: false,
    type: {
      from: Number,
      to: Number
    }
  })
  workingHours?: { from: number; to: number };

  @Prop({ required: false })
  imageUrl?: string;

  @Prop({ required: false })
  phoneNumber?: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
