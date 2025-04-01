import { Controller, Get } from '@nestjs/common';
import { AppPermissions } from './libs';
import { Permissions } from './libs/shared/decorators/permissions.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @ApiBearerAuth()
  @Get('admin-route')
  @Permissions(AppPermissions.ADMIN)
  getAdminRoute(): string {
    return 'This is an admin route';
  }

  @ApiBearerAuth()
  @Get('customer-route')
  @Permissions(AppPermissions.APP.DISPLAY)
  getCustomerRoute(): string {
    return 'This is a customer route';
  }

  @ApiBearerAuth()
  @Get('entrepreneur-route')
  @Permissions(AppPermissions.APP.DISPLAY)
  getEntrepreneurRoute(): string {
    return 'This is a entrepreneur route';
  }
}
