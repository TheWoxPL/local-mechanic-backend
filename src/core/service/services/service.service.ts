import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateServiceDTO, ServiceDTO, AvailableSlotDto } from '../dto';
import { CompaniesService } from 'src/core/companies/services/companies.service';
import { CompanyDTO } from 'src/core/companies/dtos/company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Service, Order } from 'src/models';
import { Model } from 'mongoose';
import { plainToClass } from 'class-transformer';
import { FavoriteService } from 'src/core/favorite/services/favorite.service';
import { Express } from 'express';
import { FirebaseService } from 'src/auth/firebase.service';
import { FirebaseBucketDirectory } from 'src/libs';
import { OrdersService } from 'src/core/orders/services/orders.service';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service.name)
    private serviceModel: Model<Service>,
    private companiesService: CompaniesService,
    private favoriteService: FavoriteService,
    private firebaseService: FirebaseService,
    private ordersService: OrdersService
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
    createServiceDoc.isFavorite = false;

    createServiceDoc.opinionCount = Math.floor(Math.random() * 991) + 10;
    createServiceDoc.averageRating =
      Math.round((Math.random() * 2 + 3) * 10) / 10;

    createServiceDoc.views = Math.floor(Math.random() * 9991) + 10;
    createServiceDoc.orders = Math.floor(Math.random() * 101);
    createServiceDoc.favorites = Math.floor(Math.random() * 101);

    createServiceDoc.createdBy = userId;
    createServiceDoc.updatedBy = userId;

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

  async generateServicesForUser(userId: string): Promise<ServiceDTO[]> {
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

    const favorites = await this.favoriteService.findFavoritesByUserId(userId);
    const favoriteServiceIds = new Set(favorites.map((fav) => fav.serviceId));

    const shuffled = result.sort(() => Math.random() - 0.5);
    const services: ServiceDTO[] = shuffled.map((service) =>
      plainToClass(
        ServiceDTO,
        {
          ...service,
          isFavorite: favoriteServiceIds.has(service._id.toString())
        },
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

  async uploadImageToService(
    serviceId: string,
    file: Express.Multer.File,
    userId: string
  ): Promise<string> {
    const service = await this.findServiceById(serviceId);
    if (!service) {
      throw new Error(`Service with ID ${serviceId} not found`);
    }
    const company = await this.companiesService.findCompany(service.company.id);

    if (company.owner.id !== userId) {
      throw new ForbiddenException(
        'You are not allowed to modify this service'
      );
    }

    if (!file) {
      throw new Error('No file uploaded');
    }

    const imageUrl = await this.firebaseService.uploadImageToStorage(
      file,
      FirebaseBucketDirectory.SERVICES_IMAGES_OF_SERVICES
    );
    await this.serviceModel.findByIdAndUpdate(
      serviceId,
      { imageUrl },
      { new: true }
    );

    return imageUrl;
  }

  async getAvailableSlots(serviceId: string): Promise<AvailableSlotDto[]> {
    const service = await this.findServiceById(serviceId);
    if (!service) {
      throw new Error(`Service with ID ${serviceId} not found`);
    }

    const company = await this.companiesService.findCompany(service.company.id);
    if (!company) {
      throw new Error(`Company with ID ${service.company.id} not found`);
    }

    const estimatedTimeInMinutes = parseInt(service.estimatedTime, 10);

    if (service.serviceAvailability.name === 'not specified') {
      return [];
    }
    // Use company working hours if available, otherwise default to 8AM-4PM
    const workDayStartHour = company.workingHours?.from || 8;
    const workDayEndHour = company.workingHours?.to || 16;

    const rangeStart = new Date();
    if (service.serviceAvailability.name === 'tomorrow') {
      rangeStart.setDate(rangeStart.getDate() + 1);
    }
    rangeStart.setHours(0, 0, 0, 0);
    const rangeEnd = new Date(rangeStart);
    // TODO: implement setting maximut booking time in future
    rangeEnd.setDate(rangeStart.getDate() + 14); // 2 weeks period

    const existingOrders: Order[] =
      await this.ordersService.getOrdersForServiceInRange(
        serviceId,
        rangeStart,
        rangeEnd
      );

    const bookedTimeRanges = existingOrders.map((order) => {
      const orderStartTime = new Date(order.scheduledDate);
      const orderEndTime = new Date(orderStartTime);
      orderEndTime.setMinutes(
        orderStartTime.getMinutes() + estimatedTimeInMinutes
      );
      return { start: orderStartTime, end: orderEndTime };
    });

    bookedTimeRanges.sort((a, b) => a.start.getTime() - b.start.getTime());

    const availableSlots: AvailableSlotDto[] = [];
    const now = new Date();

    for (let day = 0; day < 14; day++) {
      const currentDate = new Date(rangeStart);
      currentDate.setDate(rangeStart.getDate() + day);

      // TODO: Skip weekends (optional - remove if weekend appointments are allowed)
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        continue;
      }
      const workDayStart = new Date(currentDate);
      workDayStart.setHours(workDayStartHour, 0, 0, 0);

      const workDayEnd = new Date(currentDate);
      workDayEnd.setHours(workDayEndHour, 0, 0, 0);

      if (workDayEnd <= now) {
        continue;
      }

      const todaysBookings = bookedTimeRanges.filter(
        (range) =>
          range.start.getDate() === currentDate.getDate() &&
          range.start.getMonth() === currentDate.getMonth() &&
          range.start.getFullYear() === currentDate.getFullYear()
      );
      const allPossibleSlots: { startTime: Date; endTime: Date }[] = [];
      const slotStart = new Date(workDayStart);

      while (slotStart < workDayEnd) {
        const slotEnd = new Date(slotStart);
        slotEnd.setMinutes(slotStart.getMinutes() + estimatedTimeInMinutes);

        if (slotEnd <= workDayEnd) {
          allPossibleSlots.push({
            startTime: new Date(slotStart),
            endTime: new Date(slotEnd)
          });
        }

        slotStart.setMinutes(slotStart.getMinutes() + estimatedTimeInMinutes);
      }

      const availableSlotsForDay = allPossibleSlots.filter((slot) => {
        if (slot.endTime <= now) {
          return false;
        }

        return !todaysBookings.some(
          (booking) =>
            slot.startTime < booking.end && slot.endTime > booking.start
        );
      });

      if (todaysBookings.length === 0) {
        const firstAvailableSlot = availableSlotsForDay[0];

        if (firstAvailableSlot) {
          const fullDaySlot = {
            startTime: firstAvailableSlot.startTime,
            endTime: workDayEnd
          };
          availableSlots.push(fullDaySlot);
        }
      } else if (availableSlotsForDay.length > 0) {
        let currentBlock = {
          startTime: availableSlotsForDay[0].startTime,
          endTime: availableSlotsForDay[0].endTime
        };

        for (let i = 1; i < availableSlotsForDay.length; i++) {
          const currentSlot = availableSlotsForDay[i];

          if (
            currentSlot.startTime.getTime() === currentBlock.endTime.getTime()
          ) {
            currentBlock.endTime = currentSlot.endTime;
          } else {
            availableSlots.push(currentBlock);
            currentBlock = {
              startTime: currentSlot.startTime,
              endTime: currentSlot.endTime
            };
          }
        }

        availableSlots.push(currentBlock);
      }
    }

    return availableSlots;
  }
}
