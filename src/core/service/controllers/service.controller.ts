import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ServiceService } from '../services/service.service';
import { AppPermissions, Permissions } from '../../../libs';
import { Request } from 'express';
import { ServiceDTO, CreateServiceDTO } from '../dto/';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @ApiBearerAuth()
  @Permissions(AppPermissions.APP.DISPLAY)
  @Post('add-service')
  async addService(
    @Body() createServiceDTO: CreateServiceDTO,
    @Req() req: Request
  ): Promise<ServiceDTO> {
    const result = await this.serviceService.createService(
      createServiceDTO,
      req.session.user!.id
    );
    return result;
  }

  @Get('get-services/:companyId')
  async getAllServicesByCompanyId(
    @Param('companyId') companyId: string
  ): Promise<ServiceDTO[]> {
    const result = await this.serviceService.findServicesByCompanyId(companyId);
    return result;
  }
}
