import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UpsertDefaultsService} from './upsert-defaults.service';
import {
  UserAccount,
  UserAccountSchema,
  Role,
  RoleSchema,
  ServiceUnitSchema,
  CurrencySchema,
  Currency,
  ServiceUnit
} from '../models';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: UserAccount.name, schema: UserAccountSchema},
      {name: Role.name, schema: RoleSchema},
      {name: Currency.name, schema: CurrencySchema},
      {name: ServiceUnit.name, schema: ServiceUnitSchema}
    ])
  ],
  providers: [UpsertDefaultsService],
  exports: [UpsertDefaultsService]
})
export class UpsertDefaultsModule {}
