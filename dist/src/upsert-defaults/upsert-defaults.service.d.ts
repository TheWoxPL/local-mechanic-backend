import { OnModuleInit } from '@nestjs/common';
import { Connection, HydratedDocument, Model } from 'mongoose';
import { UserAccount, Role, Currency, ServiceUnit, TimeUnit } from '../models';
import { UserAccountDto } from 'src/core/accounts/dtos';
import { ServiceAvailability } from 'src/models/service-availability.model';
export declare class UpsertDefaultsService implements OnModuleInit {
    private readonly connection;
    private readonly userAccountModel;
    private readonly roleModel;
    private readonly currencyModel;
    private readonly serviceUnitModel;
    private readonly serviceAvailabilityModel;
    private readonly timeUnitModel;
    private systemAccount?;
    private adminAccount?;
    constructor(connection: Connection, userAccountModel: Model<UserAccount>, roleModel: Model<Role>, currencyModel: Model<Currency>, serviceUnitModel: Model<ServiceUnit>, serviceAvailabilityModel: Model<ServiceAvailability>, timeUnitModel: Model<TimeUnit>);
    onModuleInit(): Promise<void>;
    private upsertDocuments;
    private upsertDefaultData;
    private upsertDefaultModels;
    private upsertSystemAccount;
    private upsertAdminAccount;
    private createRoles;
    getSystemAccount(): Promise<UserAccountDto>;
    private createRoleIfNotExists;
    getCustomerRole(): Promise<HydratedDocument<Role> | null>;
    getEntrepreneurRole(): Promise<HydratedDocument<Role> | null>;
    getAdminRole(): Promise<HydratedDocument<Role> | null>;
}
