import { ModelDefinition } from '@nestjs/mongoose';
import { Role, RoleSchema } from './role.model';
import { UserAccount, UserAccountSchema } from './user-account.model';

export * from './role.model';
export * from './user-account.model';

export const MongooseModels: ModelDefinition[] = [
  {
    name: Role.name,
    schema: RoleSchema,
    collection: 'roles',
  },
  {
    name: UserAccount.name,
    schema: UserAccountSchema,
    collection: 'userAccounts',
  },
];
