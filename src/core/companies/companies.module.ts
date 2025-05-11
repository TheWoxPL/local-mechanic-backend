import { Module } from '@nestjs/common';
import { CompaniesController } from './controllers/companies.controller';
import { Company, CompanySchema } from 'src/models/company.model';
import { MongooseModule } from '@nestjs/mongoose';
import { CompaniesService } from './services/companies.service';
import { AccountsModule } from '../accounts/accounts.module';
import { UpsertDefaultsModule } from 'src/upsert-defaults/upsert-defaults.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    AccountsModule,
    UpsertDefaultsModule,
    AuthModule
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService]
})
export class CompaniesModule {}
