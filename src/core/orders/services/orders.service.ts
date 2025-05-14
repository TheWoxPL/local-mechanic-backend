import {
  BadRequestException,
  ForbiddenException,
  Injectable
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { plainToInstance } from 'class-transformer';
import { OrderDto } from '../dtos/order.dto';
import { Company, Order, Service } from 'src/models';
import { OrderStatus } from 'src/libs';
import { ServiceDTO } from 'src/core/service/dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Service.name) private readonly serviceModel: Model<Service>,
    @InjectModel(Company.name) private readonly companyModel: Model<Company>
  ) {}

  async isTimeSlotAvailable(
    serviceId: string,
    scheduledDate: Date
  ): Promise<boolean> {
    const service = await this.serviceModel
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

    if (!service) {
      throw new Error(`Service with id ${serviceId} does not exist`);
    }

    const bookingTime = Number(service.estimatedTime);
    const bookingStart = new Date(scheduledDate);
    const bookingEnd = new Date(scheduledDate);
    bookingEnd.setMinutes(bookingEnd.getMinutes() + bookingTime);

    const existingOrders = await this.orderModel
      .find({
        serviceId: serviceId,
        scheduledDate: {
          $gt: bookingStart,
          $lt: bookingEnd
        }
      })
      .exec();

    return existingOrders.length === 0;
  }

  async addOrder(
    createOrderDto: CreateOrderDto,
    userId: string
  ): Promise<OrderDto> {
    const serviceExists = await this.serviceModel.exists({
      _id: createOrderDto.serviceId
    });
    if (!serviceExists) {
      throw new Error(
        `Service with id ${createOrderDto.serviceId} does not exist`
      );
    }

    const isAvailable = await this.isTimeSlotAvailable(
      createOrderDto.serviceId,
      createOrderDto.scheduledDate
    );

    if (!isAvailable) {
      throw new BadRequestException(
        'This time slot is already booked. Please select a different time.'
      );
    }

    const order = new this.orderModel({
      ...createOrderDto,
      createdBy: userId,
      updatedBy: userId,
      userId: userId,
      orderStatus: OrderStatus.PENDING
    });

    const savedOrder = await order.save();
    const populatedOrder = await this.orderModel
      .findById(savedOrder._id)
      .populate({
        path: 'serviceId',
        populate: {
          path: 'company currency timeUnit serviceUnit'
        }
      })
      .lean();

    return plainToInstance(OrderDto, populatedOrder, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true
    });
  }

  async getOrdersByUserId(userId: string): Promise<OrderDto[]> {
    const orders = await this.orderModel
      .find({ userId })
      .populate({
        path: 'serviceId',
        populate: {
          path: 'company currency timeUnit serviceUnit'
        }
      })
      .sort({ scheduledDate: -1 })
      .lean()
      .exec();

    const transformedOrders = orders.map((order) => {
      return {
        ...order,
        id: order._id,
        service: order.serviceId,
        status: order.orderStatus
      };
    });

    return plainToInstance(OrderDto, transformedOrders, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true
    });
  }

  async resignOrder(orderId: string, userId: string): Promise<void> {
    const order = await this.orderModel.findById(orderId);

    if (!order) {
      throw new BadRequestException(`Order with id ${orderId} not found`);
    }

    if (order.userId.toString() !== userId) {
      throw new BadRequestException('You can only resign from your own orders');
    }

    if (new Date(order.scheduledDate) < new Date()) {
      throw new BadRequestException('Cannot resign from a completed order');
    }

    await this.orderModel.findByIdAndDelete(orderId);
  }

  async getOrdersForServiceInRange(
    serviceId: string,
    rangeStart: Date,
    rangeEnd: Date
  ): Promise<Order[]> {
    return this.orderModel
      .find({
        serviceId: serviceId,
        scheduledDate: {
          $gte: rangeStart,
          $lt: rangeEnd
        }
      })
      .lean()
      .exec();
  }

  async getOrdersByCompanyId(
    companyId: string,
    userId: string
  ): Promise<OrderDto[]> {
    const company = await this.companyModel.findById(companyId).lean().exec();

    if (!company) {
      throw new BadRequestException(`Company with id ${companyId} not found`);
    }

    if (
      company.owner.toString() !== userId &&
      (!company.verifiedOwners ||
        !company.verifiedOwners.some((id) => id.toString() === userId))
    ) {
      throw new ForbiddenException(
        'You do not have permission to view orders for this company'
      );
    }

    const services = await this.serviceModel
      .find({ company: companyId })
      .lean()
      .exec();

    const serviceIds = services.map((service) => service._id);

    if (serviceIds.length === 0) {
      return [];
    }

    const orders = await this.orderModel
      .find({ serviceId: { $in: serviceIds } })
      .populate({
        path: 'serviceId',
        populate: {
          path: 'company currency timeUnit serviceUnit'
        }
      })
      .sort({ scheduledDate: -1 })
      .lean()
      .exec();

    const transformedOrders = orders.map((order) => {
      return {
        ...order,
        id: order._id,
        service: order.serviceId,
        serviceId: undefined
      };
    });

    return plainToInstance(OrderDto, transformedOrders, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true
    });
  }

  async getAllCompanyOrdersForUser(userId: string): Promise<OrderDto[]> {
    const companies = await this.companyModel
      .find({
        $or: [{ owner: userId }, { verifiedOwners: userId }]
      })
      .lean()
      .exec();

    if (companies.length === 0) {
      return [];
    }

    const companyIds = companies.map((company) => company._id);

    const services = await this.serviceModel
      .find({ company: { $in: companyIds } })
      .lean()
      .exec();

    if (services.length === 0) {
      return [];
    }

    const serviceIds = services.map((service) => service._id);

    const orders = await this.orderModel
      .find({ serviceId: { $in: serviceIds } })
      .populate({
        path: 'serviceId',
        populate: {
          path: 'company currency timeUnit serviceUnit'
        }
      })
      .populate('userId', 'email firstName lastName')
      .sort({ scheduledDate: -1 })
      .lean()
      .exec();

    // TODO: fix typing and transforming objects
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformedOrders = orders.map((order: any) => {
      const userObj =
        order.userId && typeof order.userId === 'object' ? order.userId : null;
      const customerName = userObj
        ? `${userObj.firstName || ''} ${userObj.lastName || ''}`.trim() ||
          userObj.email
        : 'Anonymous';

      const serviceObj =
        order.serviceId && typeof order.serviceId === 'object'
          ? order.serviceId
          : null;
      const serviceName = serviceObj ? serviceObj.title : 'Unknown Service';

      return {
        ...order,
        id: order._id,
        service: order.serviceId,
        userId:
          typeof order.userId === 'object' ? order.userId._id : order.userId,
        customerName,
        serviceName,
        status: order.orderStatus
      };
    });

    return plainToInstance(OrderDto, transformedOrders, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true
    });
  }

  async confirmOrder(orderId: string, userId: string): Promise<void> {
    const order = await this.orderModel
      .findById(orderId)
      .populate({
        path: 'serviceId',
        populate: { path: 'company' }
      })
      .exec();

    if (!order) {
      throw new BadRequestException(`Order with id ${orderId} not found`);
    }

    const service = order.serviceId as unknown as ServiceDTO;
    if (!service || !service.company) {
      throw new BadRequestException('Invalid service or company data');
    }

    const company = service.company;
    const companyOwnerId = company.owner.toString();
    const verifiedOwners = company.verifiedOwners || [];

    if (
      companyOwnerId !== userId &&
      !verifiedOwners.some((ownerId: string) => ownerId.toString() === userId)
    ) {
      throw new ForbiddenException(
        'You do not have permission to confirm orders for this company'
      );
    }

    if (order.orderStatus !== OrderStatus.PENDING) {
      throw new BadRequestException('Only pending orders can be confirmed');
    }

    order.orderStatus = OrderStatus.CONFIRMED;
    order.updatedBy = userId;
    await order.save();
  }

  async rejectOrder(orderId: string, userId: string): Promise<void> {
    const order = await this.orderModel
      .findById(orderId)
      .populate({
        path: 'serviceId',
        populate: { path: 'company' }
      })
      .exec();

    if (!order) {
      throw new BadRequestException(`Order with id ${orderId} not found`);
    }

    const service = order.serviceId as unknown as ServiceDTO;
    if (!service || !service.company) {
      throw new BadRequestException('Invalid service or company data');
    }

    const company = service.company;
    const companyOwnerId = company.owner.toString();
    const verifiedOwners = company.verifiedOwners || [];

    if (
      companyOwnerId !== userId &&
      !verifiedOwners.some((ownerId: string) => ownerId.toString() === userId)
    ) {
      throw new ForbiddenException(
        'You do not have permission to reject orders for this company'
      );
    }

    if (order.orderStatus !== OrderStatus.PENDING) {
      throw new BadRequestException('Only pending orders can be rejected');
    }

    order.orderStatus = OrderStatus.REJECTED;
    order.updatedBy = userId;
    await order.save();
  }
}
