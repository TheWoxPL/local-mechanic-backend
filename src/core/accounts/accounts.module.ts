import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsService } from './services/accounts.service';
import { UpsertDefaultsService } from 'src/upsert-defaults/upsert-defaults.service';
import { Role, RoleSchema, UserAccount, UserAccountSchema } from 'src/models';
import { AccountsController } from './controllers/accounts.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserAccount.name, schema: UserAccountSchema },
      { name: Role.name, schema: RoleSchema }
    ])
  ],
  controllers: [AccountsController],
  providers: [AccountsService, UpsertDefaultsService],
  exports: [AccountsService, MongooseModule]
})
export class AccountsModule {}
