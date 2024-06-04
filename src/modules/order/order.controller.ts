import { Controller, HttpException, Post, Request } from "@nestjs/common";
import { OrderService } from "./order.service";
import { Request as req } from "express";


@Controller('order')
export class OrderController {
  constructor (private readonly _orderService: OrderService) { }


  @Post('create')
  createOrder (@Request() request: req) {
    try {
      const response = this._orderService.createOrder(request.body, request.headers['authorization'])
      return response
    } catch (error) {
      throw new HttpException(error.message, 400)
    }
  }
}