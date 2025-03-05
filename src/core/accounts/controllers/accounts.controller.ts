import { Controller, Req } from '@nestjs/common';
import { AccountsService } from '../services/accounts.service';
import { Post } from '@nestjs/common';
import { Request } from 'express';
import { RoleType } from 'src/libs';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('add-customer-role')
  async addCustomerRole(@Req() req: Request): Promise<string> {
    return await this.accountsService.addRole(
      RoleType.CUSTOMER,
      req.session.user!.email
    );
  }

  @Post('add-entrepreneur-role')
  async addEntrepreneurRole(@Req() req: Request): Promise<string> {
    return await this.accountsService.addRole(
      RoleType.ENTREPRENEUR,
      req.session.user!.email
    );
  }
}
