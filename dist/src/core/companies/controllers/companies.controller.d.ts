import { Request } from 'express';
import { CompaniesService } from '../services/companies.service';
import { CreateCompanyDTO } from '../dtos/create-company.dto';
import { CompanyDTO } from '../dtos/company.dto';
export declare class CompaniesController {
    private readonly companiesService;
    constructor(companiesService: CompaniesService);
    addCompany(createCompanyDto: CreateCompanyDTO, req: Request): Promise<CompanyDTO>;
    getCompanies(req: Request): Promise<CompanyDTO[]>;
    getCompany(uuid: string): Promise<CompanyDTO>;
}
