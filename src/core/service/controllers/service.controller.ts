import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { ServiceService } from '../services/service.service';
import { AppPermissions, Permissions } from '../../../libs';
import { Request, Response } from 'express';
import { ServiceDTO, CreateServiceDTO } from '../dto/';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
// eslint-disable-next-line n/no-extraneous-import
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';

@Controller('services')
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

  @ApiBearerAuth()
  @Permissions(AppPermissions.APP.DISPLAY)
  @Get('get-services/:companyId')
  async getAllServicesByCompanyId(
    @Param('companyId') companyId: string
  ): Promise<ServiceDTO[]> {
    const result = await this.serviceService.findServicesByCompanyId(companyId);
    return result;
  }

  @ApiBearerAuth()
  @Permissions(AppPermissions.APP.DISPLAY)
  @Delete(':serviceId')
  async removeService(
    @Param('serviceId') serviceId: string,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    try {
      await this.serviceService.removeServiceById(
        serviceId,
        req.session.user!.id
      );
      return res.status(200).json({ message: 'Service successfully removed' });
    } catch (error) {
      if (error instanceof ForbiddenException) {
        return res
          .status(403)
          .json({ message: 'You are not allowed to remove this service' });
      }
      return res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }

  @ApiBearerAuth()
  @Permissions(AppPermissions.APP.DISPLAY)
  @Get('generate-services-for-user')
  async generateServicesForUser(@Req() req: Request): Promise<ServiceDTO[]> {
    const result = await this.serviceService.generateServicesForUser(
      req.session.user!.id
    );
    return result;
  }

  @ApiBearerAuth()
  @Permissions(AppPermissions.APP.DISPLAY)
  @Get('get-service-by-id/:serviceId')
  async getServiceById(
    @Param('serviceId') serviceId: string
  ): Promise<ServiceDTO> {
    const result = await this.serviceService.findServiceById(serviceId);
    return result;
  }

  @ApiBearerAuth()
  @Permissions(AppPermissions.APP.DISPLAY)
  @Get('get-favorite-services-for-user')
  async getFavoriteServicesForUser(@Req() req: Request): Promise<ServiceDTO[]> {
    const result = await this.serviceService.getFavoriteServicesForUser(
      req.session.user!.id
    );
    return result;
  }

  @ApiBearerAuth()
  @Permissions(AppPermissions.APP.DISPLAY)
  @Post('upload-image-to-service')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          req: Express.Request,
          file: Express.Multer.File,
          cb: (error: Error | null, filename: string) => void
        ) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);

          cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`
          );
        }
      })
    })
  )
  async uploadServiceImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadData: { serviceId: string },
    @Req() req: Request
  ): Promise<ServiceDTO> {
    if (!uploadData || !uploadData.serviceId) {
      throw new Error('Service ID is required');
    }

    const result = await this.serviceService.uploadImageToService(
      uploadData.serviceId,
      file,
      req.session.user!.id
    );
    return result;
  }
}
