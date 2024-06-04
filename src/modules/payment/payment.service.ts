import { HttpService } from "@nestjs/axios";
import { HttpException, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { lastValueFrom } from "rxjs";
import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class PaymentService {
  constructor (private readonly httpService: HttpService) { }

  async makeCharge (data: any, authorization: any): Promise<any> {
    try {
      // prepare data object before send to Upayments url
      const paymentData = {
        products: data.order.products,
        order: {
          id: data.order._id, // mandatory
          description: data.order.description, //mandatory
          currency: "KWD", //mandatory
          amount: data.order.price //mandatory I clac that 
        },
        paymentGateway: { src: "knet" }, // knet, cc, samsung-pay, apple-pay, google-pay and create-invoice
        language: "en",// mandatory
        reference: {
          id: data.order._id //"Refers to the order or transaction ID in your own system we will save your ID for our reference."
        },
        returnUrl: "http://localhost:3000/order/successfully-transaction",//mandatory: url for successful payment
        cancelUrl: "https://error.com", //mandatory: url for cancel or failure payment
        notificationUrl: "https://webhook.site/d7c6e1c8-b98b-4f77-8b51-b487540df336",//mandatory:  will receive the webhook data
      }

      // user api for make charge by UPayments service 
      const url = process.env.URL_CHARGE
      const response: AxiosResponse<any> = await lastValueFrom(this.httpService.post(url, paymentData, { headers: { authorization } }));

      // return response  
      return response.data;

    } catch (error) {
      throw new HttpException(error.message, error.response.status);
    }
  }

}
