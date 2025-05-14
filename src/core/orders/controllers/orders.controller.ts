import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req
} from '@nestjs/common';
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
import { OrderDto } from '../dtos/order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

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
  ): Promise<OrderDto> {
    const userId = req.session.user!.id;
    return this.ordersService.addOrder(createOrderDto, userId);
  }

  @Permissions(AppPermissions.APP.DISPLAY)
  @ApiBearerAuth()
  @Get('get-user-orders')
  @ApiOperation({ summary: 'Get all orders for a user' })
  @ApiResponse({
    status: 200,
    description: 'List of orders for the specified user',
    type: [Order]
  })
  async getOrdersByUserId(@Req() req: Request): Promise<OrderDto[]> {
    return this.ordersService.getOrdersByUserId(req.session.user!.id);
  }

  @Permissions(AppPermissions.APP.DISPLAY)
  @ApiBearerAuth()
  @Delete('resign-order/:orderId')
  @ApiOperation({ summary: 'Resign from an order' })
  @ApiResponse({
    status: 200,
    description: 'Order has been successfully canceled'
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async resignOrder(
    @Param('orderId') orderId: string,
    @Req() req: Request
  ): Promise<void> {
    await this.ordersService.resignOrder(orderId, req.session.user!.id);
  }

  @Permissions(AppPermissions.APP.DISPLAY)
  @ApiBearerAuth()
  @Get('get-company-orders/:companyId')
  @ApiOperation({ summary: 'Get all orders for a specific company' })
  @ApiResponse({
    status: 200,
    description: 'List of orders for the specified company',
    type: [OrderDto]
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden - User does not have permission to view orders for this company'
  })
  async getCompanyOrders(
    @Param('companyId') companyId: string,
    @Req() req: Request
  ): Promise<OrderDto[]> {
    return this.ordersService.getOrdersByCompanyId(
      companyId,
      req.session.user!.id
    );
  }

  @Permissions(AppPermissions.APP.DISPLAY)
  @ApiBearerAuth()
  @Get('get-all-company-orders')
  @ApiOperation({
    summary: 'Get all orders from all companies owned by the current user'
  })
  @ApiResponse({
    status: 200,
    description: 'List of orders from all companies owned by the current user',
    type: [OrderDto]
  })
  async getAllCompanyOrders(@Req() req: Request): Promise<OrderDto[]> {
    return this.ordersService.getAllCompanyOrdersForUser(req.session.user!.id);
  }

  @Permissions(AppPermissions.APP.DISPLAY)
  @ApiBearerAuth()
  @Post('confirm-order/:orderId')
  @ApiOperation({ summary: 'Confirm an order' })
  @ApiResponse({
    status: 200,
    description: 'Order has been successfully confirmed'
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden - User does not have permission to confirm orders for this company'
  })
  async confirmOrder(
    @Param('orderId') orderId: string,
    @Req() req: Request
  ): Promise<void> {
    await this.ordersService.confirmOrder(orderId, req.session.user!.id);
  }

  @Permissions(AppPermissions.APP.DISPLAY)
  @ApiBearerAuth()
  @Post('reject-order/:orderId')
  @ApiOperation({ summary: 'Reject an order' })
  @ApiResponse({
    status: 200,
    description: 'Order has been successfully rejected'
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden - User does not have permission to reject orders for this company'
  })
  async rejectOrder(
    @Param('orderId') orderId: string,
    @Req() req: Request
  ): Promise<void> {
    await this.ordersService.rejectOrder(orderId, req.session.user!.id);
  }
}
