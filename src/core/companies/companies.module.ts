import { Module } from '@nestjs/common';
import { CompaniesController } from './controllers/companies.controller';
import { Company, CompanySchema } from 'src/models/company.model';
import { MongooseModule } from '@nestjs/mongoose';
import { CompaniesService } from './services/companies.service';
import { UpsertDefaultsService } from 'src/upsert-defaults/upsert-defaults.service';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema }
    ]),
    AccountsModule
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService, UpsertDefaultsService],
  exports: []
})
export class CompaniesModule { }
