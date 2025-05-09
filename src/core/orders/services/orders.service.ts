import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { plainToInstance } from 'class-transformer';
import { OrderDto } from '../dtos/order.dto';
import { Service, Order } from 'src/models';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Service.name) private readonly serviceModel: Model<Service>
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
      userId: userId
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
        service: order.serviceId
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
}
