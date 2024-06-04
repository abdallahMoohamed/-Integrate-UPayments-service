import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./product.schema";
import { Model } from "mongoose";


@Injectable()
export class ProductDBService {
  constructor (@InjectModel(Product.name) private _productModel: Model<Product>) { }

  async find (condition: any): Promise<Product[]> {
    const products = await this._productModel.find(condition)
    return products
  }

  async createProudct (data: any): Promise<Product> {
    const product = await this._productModel.create(data)
    return product
  }
}