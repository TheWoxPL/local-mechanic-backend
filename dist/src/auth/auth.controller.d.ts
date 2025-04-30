import { AuthService } from './auth.service';
import { Request } from 'express';
import { ResponseTokenDTO } from './dtos';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    verifyToken(authorization: string, request: Request): Promise<ResponseTokenDTO>;
}
