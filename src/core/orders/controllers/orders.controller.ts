import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { OrdersService } from '../services/orders.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { AppPermissions, Permissions } from '../../../libs';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { Order } from '../../../models/order.model';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  // @Permissions(AppPermissions.APP.DISPLAY)
  @Get('test')
  async test(): Promise<string> {
    return this.ordersService.test();
  }

  @Permissions(AppPermissions.APP.DISPLAY)
  @ApiBearerAuth()
  @Post('add-order')
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
    type: Order
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req: Request
  ): Promise<Order> {
    return this.ordersService.addOrder(createOrderDto, req.session.user!.id);
  }
}
