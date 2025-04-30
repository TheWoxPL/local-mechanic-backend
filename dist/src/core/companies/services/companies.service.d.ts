import { Model } from 'mongoose';
import { Company } from 'src/models/company.model';
import { CreateCompanyDTO } from '../dtos/create-company.dto';
import { CompanyDTO } from '../dtos/company.dto';
import { AccountsService } from 'src/core/accounts/services/accounts.service';
export declare class CompaniesService {
    private companyModel;
    private accountsService;
    constructor(companyModel: Model<Company>, accountsService: AccountsService);
    create(createCompanyDto: CreateCompanyDTO, userEmail: string): Promise<CompanyDTO>;
    findUserCompanies(userEmail: string): Promise<CompanyDTO[]>;
    findCompany(uuid: string): Promise<CompanyDTO>;
}
