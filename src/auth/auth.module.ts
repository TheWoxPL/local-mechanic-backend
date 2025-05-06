import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseService } from './firebase.service';
import { UserAccount, UserAccountSchema, Role, RoleSchema } from 'src/models';
import { AccountsModule } from 'src/core/accounts/accounts.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserAccount.name, schema: UserAccountSchema },
      { name: Role.name, schema: RoleSchema }
    ]),
    AccountsModule
  ],
  providers: [AuthService, FirebaseService],
  controllers: [AuthController],
  exports: [AuthService, FirebaseService]
})
export class AuthModule {}
