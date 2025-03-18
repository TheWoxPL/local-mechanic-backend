import { Controller, Get, Req } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Request } from 'express';
import { CompaniesService } from '../services/companies.service';
import { CreateCompanyDTO } from '../dtos/create-company.dto';
import { AppPermissions, Permissions } from '../../../libs';
import { UpsertDefaultsService } from 'src/upsert-defaults/upsert-defaults.service';
import { CompanyDTO } from '../dtos/company.dto';
// import { CompanyDTO } from '../dtos/company.dto';


@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly companieService: CompaniesService,
  ) { }

  @Permissions(AppPermissions.APP.DISPLAY)
  @Post('add-company')
  async addCompany(@Req() req: Request): Promise<CompanyDTO> {
    const result = await this.companieService.create(req.body, req.session.user!.email);
    return result;
  }
}
