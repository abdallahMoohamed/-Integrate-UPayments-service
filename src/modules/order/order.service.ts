import { Injectable } from "@nestjs/common";
import { PaymentService } from "../payment/payment.service";



@Injectable()
export class OrderService {
  constructor (private readonly _paymentService: PaymentService) { }


  async createOrder (data: any, auth: any): Promise<any> {
    const PaymentResponse = await this._paymentService.makeCharge(data, auth)

    return PaymentResponse
  }


}