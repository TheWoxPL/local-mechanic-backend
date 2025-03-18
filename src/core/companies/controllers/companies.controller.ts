import { Controller, Get, Req } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Request } from 'express';
import { CompaniesService } from '../services/companies.service';
import { CreateCompanyDTO } from '../dtos/create-company.dto';
import { Permissions } from '../../../libs';
import { UpsertDefaultsService } from 'src/upsert-defaults/upsert-defaults.service';
import { CompanyDTO } from '../dtos/company.dto';


@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly companieService: CompaniesService,
    private upsertDefaultsService: UpsertDefaultsService,
  ) { }

  @Permissions([])
  @Get('add-company')
  async addCompany(@Req() req: Request): Promise<string> {
    const systemUser = await this.upsertDefaultsService.getSystemAccount();
    let createCompanyDto = new CreateCompanyDTO()
    createCompanyDto.companyName = "Mock Company";
    createCompanyDto.description = "Mock Description";
    createCompanyDto.foundDate = new Date();
    createCompanyDto.owners = "Mock Owner";
    createCompanyDto.verifiedOwners = [];
    createCompanyDto.createdBy = systemUser;
    createCompanyDto.updatedBy = systemUser;


    const result = await this.companieService.create(createCompanyDto);
    console.log(result)
    return "sad";
  }

  // @Post('add-customer-role')
  // async addCustomerRole(@Req() req: Request): Promise<string> {
  //   return await this.accountsService.addRole(
  //     RoleType.CUSTOMER,
  //     req.session.user!.email
  //   );
  // }

  // @Post('add-entrepreneur-role')
  // async addEntrepreneurRole(@Req() req: Request): Promise<string> {
  //   return await this.accountsService.addRole(
  //     RoleType.ENTREPRENEUR,
  //     req.session.user!.email
  //   );
  // }
}
