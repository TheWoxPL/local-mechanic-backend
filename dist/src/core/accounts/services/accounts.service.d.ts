import { Model } from 'mongoose';
import { UserAccount } from 'src/models';
import { UpsertDefaultsService } from 'src/upsert-defaults/upsert-defaults.service';
import { CreateUserAccountDto, UserAccountDto } from '../dtos';
export declare class AccountsService {
    private userAccountModel;
    private upsertDefaultsService;
    constructor(userAccountModel: Model<UserAccount>, upsertDefaultsService: UpsertDefaultsService);
    create(createUserAccountDto: CreateUserAccountDto): Promise<UserAccountDto>;
    findById(id: string): Promise<UserAccountDto>;
    findByEmail(email: string): Promise<UserAccountDto>;
    addRole(roleName: string, email: string): Promise<string>;
    hasAnyRoleByEmail(email: string): Promise<boolean>;
}
