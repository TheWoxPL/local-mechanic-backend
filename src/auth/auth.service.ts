import {Injectable, UnauthorizedException} from '@nestjs/common';
import {FirebaseService} from './firebase.service';
import {PermissionRule} from 'src/models';
import {AccountsService} from 'src/core/accounts/services/accounts.service';
import {CreateUserAccountDto} from 'src/core/accounts/dtos';
import {Request} from 'express';
import {uniqWith, isEqual} from 'lodash';
import {ResponseTokenDTO} from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private firebaseService: FirebaseService,
    private accountsService: AccountsService
  ) {}

  async verifyToken(
    token: string,
    request: Request
  ): Promise<ResponseTokenDTO> {
    try {
      const decodedToken = await this.firebaseService.verifyGoogleToken(token);
      if (!decodedToken) {
        throw new UnauthorizedException('Invalid token');
      }
      let user = await this.accountsService.findByEmail(decodedToken.email!);
      if (user === null) {
        try {
          const createUserAccountDto = new CreateUserAccountDto();
          createUserAccountDto.email = decodedToken.email!;
          createUserAccountDto.firstName = decodedToken.name;
          createUserAccountDto.lastName = null!;
          user = await this.accountsService.create(createUserAccountDto);
        } catch (error) {
          throw new UnauthorizedException('Error adding new user');
        }
      }

      const permissionsArray = uniqWith(
        user.role.reduce<PermissionRule[]>((acc, role) => {
          return acc.concat(role.permissions);
        }, []),
        isEqual
      );
      request.session.user = {
        id: user.id,
        email: user.email,
        permissions: permissionsArray
      };

      const responseToken: ResponseTokenDTO = {
        username: user.username,
        id: user.id,
        firstName: user.firstName!,
        lastName: user.lastName!,
        email: user.email,
        roles: user.role.map((role) => role.name),
        status: user.status
      };

      return responseToken;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
