import {
  Body,
  Controller,
  Get,
  Param,
  Req,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Request } from 'express';
import { CompaniesService } from '../services/companies.service';
import { CreateCompanyDTO } from '../dtos/create-company.dto';
import { AppPermissions, Permissions } from '../../../libs';
import { CompanyDTO } from '../dtos/company.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';

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

  @ApiBearerAuth()
  @Permissions(AppPermissions.APP.DISPLAY)
  @Post('upload-image-to-company')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCompanyImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadData: { companyId: string },
    @Req() req: Request
  ): Promise<string> {
    if (!uploadData || !uploadData.companyId) {
      throw new Error('Company ID is required');
    }

    const result = await this.companiesService.uploadImageToCompany(
      uploadData.companyId,
      file,
      req.session.user!.id
    );
    return result;
  }
}
