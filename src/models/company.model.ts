import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {BaseClass} from './base.model';

@Schema()
export class Company extends BaseClass {
  @Prop({required: true})
  companyName!: string;

  @Prop({required: false})
  description?: string;

  @Prop({required: true, default: Date.now})
  foundDate!: Date;

  @Prop({required: false})
  owners?: string;

  @Prop({
    required: false,
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'UserAccount'
  })
  verifiedOwners!: string[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
