import { Body, Controller, Get, HttpException, Post, Request } from "@nestjs/common";
import { OrderService } from "./order.service";
import { Request as req } from "express";
import { CreateOrderDTO } from "./validation/order.dto";


@Controller('order')
export class OrderController {
  constructor (private readonly _orderService: OrderService) { }


  @Post('create')
  createOrder (@Request() request: req, @Body() data: CreateOrderDTO) {
    try {
      const response = this._orderService.createOrder(data, request.headers['authorization'])
      return response
    } catch (error) {
      throw new HttpException(error.message, 400)
    }
  }

}