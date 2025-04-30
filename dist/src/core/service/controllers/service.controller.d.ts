import { ServiceService } from '../services/service.service';
import { Request, Response } from 'express';
import { ServiceDTO, CreateServiceDTO } from '../dto/';
export declare class ServiceController {
    private readonly serviceService;
    constructor(serviceService: ServiceService);
    addService(createServiceDTO: CreateServiceDTO, req: Request): Promise<ServiceDTO>;
    getAllServicesByCompanyId(companyId: string): Promise<ServiceDTO[]>;
    removeService(serviceId: string, req: Request, res: Response): Promise<Response>;
    generateServicesForUser(): Promise<ServiceDTO[]>;
}
