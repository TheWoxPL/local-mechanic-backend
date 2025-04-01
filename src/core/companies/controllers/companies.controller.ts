import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Request } from 'express';
import { CompaniesService } from '../services/companies.service';
import { CreateCompanyDTO } from '../dtos/create-company.dto';
import { AppPermissions, Permissions } from '../../../libs';
import { CompanyDTO } from '../dtos/company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Permissions(AppPermissions.APP.DISPLAY)
  @Post('add-company')
  async addCompany(
    @Body() createCompanyDto: CreateCompanyDTO,
    @Req() req: Request
  ): Promise<CompanyDTO> {
    const result = await this.companiesService.create(
      createCompanyDto,
      req.session.user!.email
    );
    return result;
  }

  @Permissions(AppPermissions.APP.DISPLAY)
  @Get('get-user-companies')
  async getCompanies(@Req() req: Request): Promise<CompanyDTO[]> {
    const result = await this.companiesService.findUserCompanies(
      req.session.user!.email
    );
    return result;
  }

  @Get('get-company/:uuid')
  async getCompany(@Param('uuid') uuid: string): Promise<CompanyDTO> {
    const result = await this.companiesService.findCompany(uuid);
    return result;
  }
}
