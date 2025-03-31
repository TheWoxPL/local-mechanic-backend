import {ModelDefinition} from '@nestjs/mongoose';
import {Role, RoleSchema} from './role.model';
import {UserAccount, UserAccountSchema} from './user-account.model';
import {Company, CompanySchema} from './company.model';
import {Currency, CurrencySchema} from './currency.model';
import {ServiceUnit, ServiceUnitSchema} from './service-unit.model';

export * from './role.model';
export * from './user-account.model';
export * from './company.model';
export * from './currency.model';
export * from './service-unit.model';

export const MongooseModels: ModelDefinition[] = [
  {
    name: Role.name,
    schema: RoleSchema,
    collection: 'roles'
  },
  {
    name: UserAccount.name,
    schema: UserAccountSchema,
    collection: 'userAccounts'
  },
  {
    name: Company.name,
    schema: CompanySchema,
    collection: 'companies'
  },
  {
    name: Currency.name,
    schema: CurrencySchema,
    collection: 'currencies'
  },
  {
    name: ServiceUnit.name,
    schema: ServiceUnitSchema,
    collection: 'serviceUnits'
  }
];
