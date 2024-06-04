import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PaymentService } from "../payment/payment.service";
import { OrderDBService } from "src/DB/orderDB/order.db.service";
import { CreateOrderDTO } from "./validation/order.dto";
import { CartDbService } from "src/DB/cartDB/cart.db.service";
import { Types } from "mongoose";
import { ProductDBService } from "src/DB/productDB/produt.db.service";




@Injectable()
export class OrderService {
  constructor (
    private readonly _paymentService: PaymentService,
    private readonly _orderDBService: OrderDBService,
    private readonly _cartDBService: CartDbService,
    private readonly _productDBService: ProductDBService

  ) { }


  /**
   * @todo Quantity decrease when payment transcation is done
   */
  async createOrder (data: CreateOrderDTO, auth: any): Promise<any> {

    // get cart by userId
    const cart = await this._cartDBService.findOne({ userId: new Types.ObjectId(data.user) })
    if (!cart)
      throw new NotFoundException("Not found cart for this user")

    // check products existance in cart 
    if (!cart.products.length)
      throw new BadRequestException("Cart is empty !")
    // calculate all prices for order 
    const price = cart.products.reduce((accumulator, product) => {
      return accumulator + (product.price * product.quantity)
    }, 0)

    // get all products with details 
    const idsProducts = cart.products.map((product) => {
      return product.productId
    })
    const products = await this._productDBService.find({ _id: { $in: idsProducts } })

    // create order 
    const order = await this._orderDBService.createOrder({
      products,
      address: data.address,
      phone: data.phone,
      user: data.user,
      description: data.description,
      price,
    })

    // put all order to data object 
    data['order'] = order

    // payment the order 
    const paymentResponse = await this._paymentService.makeCharge(data, auth)

    // return response 
    return { paymentResponse, cart, products }
  }


}