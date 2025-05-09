import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { plainToClass } from 'class-transformer';
import { SearchSuggestionDto } from '../dtos/search-suggestion.dto';
import { Service } from 'src/models/service.model';
import { Company } from 'src/models/company.model';
import { ServiceDTO } from 'src/core/service/dto';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<Service>,
    @InjectModel(Company.name) private companyModel: Model<Company>
  ) {}

  async getSuggestions(query: string): Promise<SearchSuggestionDto[]> {
    if (!query || query.trim() === '') {
      const topServices = await this.serviceModel
        .find()
        .sort({ updatedAt: -1 })
        .limit(5)
        .lean()
        .exec();

      return topServices.map((service) => ({
        id: service._id.toString(),
        name: service.title,
        category: 'Service'
      }));
    }

    const normalizedQuery = query.toLowerCase().trim();

    const services = await this.serviceModel
      .find({
        title: { $regex: normalizedQuery, $options: 'i' }
      })
      .limit(8)
      .lean()
      .exec();

    const serviceResults = services.map((service) => ({
      id: service._id.toString(),
      name: service.title,
      category: 'Service'
    }));

    const companies = await this.companyModel
      .find({
        companyName: { $regex: normalizedQuery, $options: 'i' }
      })
      .limit(5)
      .lean()
      .exec();

    const companyResults = companies.map((company) => ({
      id: company._id.toString(),
      name: company.companyName,
      category: 'Company'
    }));

    return [...serviceResults, ...companyResults].slice(0, 10);
  }

  async searchServices(query: string): Promise<ServiceDTO[]> {
    const normalizedQuery = query.toLowerCase().trim();

    const services = await this.serviceModel
      .find({
        title: { $regex: normalizedQuery, $options: 'i' }
      })
      .populate([
        'currency',
        'timeUnit',
        'serviceUnit',
        'serviceAvailability',
        'company'
      ])
      .limit(20)
      .lean()
      .exec();

    return services.map((service) =>
      plainToClass(ServiceDTO, service, {
        excludeExtraneousValues: true
      })
    );
  }
}
