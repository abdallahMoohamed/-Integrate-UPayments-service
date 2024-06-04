import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cart } from "./cart.schema";


@Injectable()
export class CartDbService {
  constructor (@InjectModel(Cart.name) private _cartModel: Model<Cart>) { }

  async createCart (data: any): Promise<Cart> {
    const cart = await this._cartModel.create(data)
    return cart
  }

  async findOne (condition: any): Promise<Cart> {
    const cart = await this._cartModel.findOne(condition)
    return cart
  }
}