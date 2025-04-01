import { Injectable } from '@nestjs/common';
import { CreateServiceDTO, ServiceDTO } from '../dto';
import { CompaniesService } from 'src/core/companies/services/companies.service';
import { CompanyDTO } from 'src/core/companies/dtos/company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Service } from 'src/models/service.model';
import { Model } from 'mongoose';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service.name)
    private serviceModel: Model<Service>,
    private companiesService: CompaniesService
  ) {}

  async createService(
    createServiceDTO: CreateServiceDTO,
    userId: string
  ): Promise<ServiceDTO> {
    const givenCompany: CompanyDTO = await this.companiesService.findCompany(
      createServiceDTO.companyId
    );
    if (givenCompany.owner.id !== userId) {
      throw new Error('You are not the owner of this company');
    }

    const createServiceDoc = new this.serviceModel();
    createServiceDoc.title = createServiceDTO.title;
    createServiceDoc.description = createServiceDTO.description;
    createServiceDoc.estimatedTime = createServiceDTO.estimatedTime;
    createServiceDoc.timeUnit = createServiceDTO.timeUnitId;
    createServiceDoc.serviceAvailability =
      createServiceDTO.serviceAvailabilityId;
    createServiceDoc.price = createServiceDTO.price;
    createServiceDoc.currency = createServiceDTO.currencyId;
    createServiceDoc.serviceUnit = createServiceDTO.serviceUnitId;
    createServiceDoc.company = createServiceDTO.companyId;
    const result = await createServiceDoc.save();
    return plainToClass(ServiceDTO, result, {
      excludeExtraneousValues: true
    });
  }

  async findServicesByCompanyId(companyId: string): Promise<ServiceDTO[]> {
    const result = await this.serviceModel
      .find({ company: companyId })
      .populate([
        'currency',
        'timeUnit',
        'serviceUnit',
        'serviceAvailability',
        'company'
      ])
      .lean()
      .exec();
    const services: ServiceDTO[] = result.map((service) =>
      plainToClass(ServiceDTO, service, {
        excludeExtraneousValues: true
      })
    );
    return services;
  }
}
