import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateServiceDTO, ServiceDTO } from '../dto';
import { CompaniesService } from 'src/core/companies/services/companies.service';
import { CompanyDTO } from 'src/core/companies/dtos/company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Service } from 'src/models/service.model';
import { Model } from 'mongoose';
import { plainToClass } from 'class-transformer';
import { FavoriteService } from 'src/core/favorite/services/favorite.service';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service.name)
    private serviceModel: Model<Service>,
    private companiesService: CompaniesService,
    private favoriteService: FavoriteService
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

  async findServiceById(serviceId: string): Promise<ServiceDTO> {
    const result = await this.serviceModel
      .findById(serviceId)
      .populate([
        'currency',
        'timeUnit',
        'serviceUnit',
        'serviceAvailability',
        'company'
      ])
      .lean()
      .exec();
    return plainToClass(ServiceDTO, result, {
      excludeExtraneousValues: true
    });
  }

  async doesServiceExistById(serviceId: string): Promise<boolean> {
    const count = await this.serviceModel
      .countDocuments({ _id: serviceId })
      .exec();
    return count > 0;
  }

  async removeServiceById(serviceId: string, userId: string): Promise<void> {
    const givenService: ServiceDTO = await this.findServiceById(serviceId);
    const givenCompany: CompanyDTO = await this.companiesService.findCompany(
      givenService.company.id
    );
    if (givenCompany.owner.id !== userId) {
      throw new ForbiddenException();
    }
    await this.serviceModel.findByIdAndDelete(serviceId).exec();
  }

  async generateServicesForUser(): Promise<ServiceDTO[]> {
    const result = await this.serviceModel
      .find({})
      .limit(50)
      .populate([
        'currency',
        'timeUnit',
        'serviceUnit',
        'serviceAvailability',
        'company'
      ])
      .lean()
      .exec();

    const shuffled = result.sort(() => Math.random() - 0.5);
    const services: ServiceDTO[] = shuffled.map((service) =>
      plainToClass(
        ServiceDTO,
        { ...service, isFavorite: false },
        {
          excludeExtraneousValues: true
        }
      )
    );

    return services;
  }

  async getFavoriteServicesForUser(userId: string): Promise<ServiceDTO[]> {
    const favorites = await this.favoriteService.findFavoritesByUserId(userId);
    const serviceIds = favorites.map((fav) => fav.serviceId);

    const result = await this.serviceModel
      .find({ _id: { $in: serviceIds } })
      .populate([
        'currency',
        'timeUnit',
        'serviceUnit',
        'serviceAvailability',
        'company'
      ])
      .lean()
      .exec();

    return result.map((service) =>
      plainToClass(
        ServiceDTO,
        { ...service, isFavorite: true },
        { excludeExtraneousValues: true }
      )
    );
  }
}
