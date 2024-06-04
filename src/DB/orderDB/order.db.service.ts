import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order } from "./order.schema";


@Injectable()
export class OrderDBService {
  constructor (@InjectModel(Order.name) private _orderModel: Model<Order>) { }

  async createOrder (data: any): Promise<Order> {
    const order = await this._orderModel.create(data)
    return order
  }
}