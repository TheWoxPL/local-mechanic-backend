import { FirebaseService } from './firebase.service';
import { AccountsService } from 'src/core/accounts/services/accounts.service';
import { Request } from 'express';
import { ResponseTokenDTO } from './dtos';
export declare class AuthService {
    private firebaseService;
    private accountsService;
    constructor(firebaseService: FirebaseService, accountsService: AccountsService);
    verifyToken(token: string, request: Request): Promise<ResponseTokenDTO>;
}
