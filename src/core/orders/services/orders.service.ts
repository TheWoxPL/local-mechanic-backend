import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../../../models/order.model';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { ServiceService } from 'src/core/service/services/service.service';
import { plainToInstance } from 'class-transformer';
import { OrderDto } from '../dtos/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    private readonly serviceService: ServiceService
  ) {}

  async test(): Promise<string> {
    return 'test';
  }

  async isTimeSlotAvailable(
    serviceId: string,
    scheduledDate: Date
  ): Promise<boolean> {
    const service = await this.serviceService.findServiceById(serviceId);
    if (!service) {
      throw new Error(`Service with id ${serviceId} does not exist`);
    }

    const bookingTime = Number(service.estimatedTime);

    const bookingStart = new Date(scheduledDate);
    bookingStart.setHours(bookingStart.getHours());

    const bookingEnd = new Date(scheduledDate);
    bookingEnd.setHours(bookingEnd.getHours() + bookingTime);

    const existingOrders = await this.orderModel
      .find({
        serviceId: serviceId,
        scheduledDate: {
          $gte: bookingStart,
          $lte: bookingEnd
        }
      })
      .exec();

    return existingOrders.length === 0;
  }

  async addOrder(
    createOrderDto: CreateOrderDto,
    userId: string
  ): Promise<OrderDto> {
    const serviceExists = await this.serviceService.doesServiceExistById(
      createOrderDto.serviceId
    );
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
      userId: userId
    });

    const savedOrder = await order.save();
    const populatedOrder = await this.orderModel
      .findById(savedOrder._id)
      .populate('serviceId')
      .lean();

    return plainToInstance(OrderDto, populatedOrder, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true
    });
  }

  async getOrdersByUserId(userId: string): Promise<OrderDto[]> {
    const orders = await this.orderModel
      .find({ userId })
      .populate('serviceId')
      .sort({ scheduledDate: -1 })
      .lean()
      .exec();

    const orderDtos = plainToInstance(OrderDto, orders, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true
    });
    return orderDtos;
  }
}
