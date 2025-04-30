import { CreateServiceDTO, ServiceDTO } from '../dto';
import { CompaniesService } from 'src/core/companies/services/companies.service';
import { Service } from 'src/models/service.model';
import { Model } from 'mongoose';
export declare class ServiceService {
    private serviceModel;
    private companiesService;
    constructor(serviceModel: Model<Service>, companiesService: CompaniesService);
    createService(createServiceDTO: CreateServiceDTO, userId: string): Promise<ServiceDTO>;
    findServicesByCompanyId(companyId: string): Promise<ServiceDTO[]>;
    findServiceById(serviceId: string): Promise<ServiceDTO>;
    removeServiceById(serviceId: string, userId: string): Promise<void>;
    generateServicesForUser(): Promise<ServiceDTO[]>;
}
