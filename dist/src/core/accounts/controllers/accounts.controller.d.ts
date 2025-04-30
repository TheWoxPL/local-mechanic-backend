import { AccountsService } from '../services/accounts.service';
import { Request } from 'express';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    addCustomerRole(req: Request): Promise<string>;
    addEntrepreneurRole(req: Request): Promise<string>;
}
