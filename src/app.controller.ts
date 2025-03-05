import { Controller, Get } from '@nestjs/common';
import { AppPermissions } from './libs';
import { Permissions } from './libs/shared/decorators/permissions.decorator';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('admin-route')
  @Permissions(AppPermissions.ADMIN)
  getAdminRoute(): string {
    return 'This is an admin route';
  }
}
