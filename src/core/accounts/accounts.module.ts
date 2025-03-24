import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AccountsService} from './services/accounts.service';
import {} from 'src/upsert-defaults/upsert-defaults.service';
import {Role, RoleSchema, UserAccount, UserAccountSchema} from 'src/models';
import {AccountsController} from './controllers/accounts.controller';
import {UpsertDefaultsModule} from 'src/upsert-defaults/upsert-defaults.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: UserAccount.name, schema: UserAccountSchema},
      {name: Role.name, schema: RoleSchema}
    ]),
    UpsertDefaultsModule
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService, MongooseModule]
})
export class AccountsModule {}
