import { HttpService } from "@nestjs/axios";
import { HttpException, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { lastValueFrom } from "rxjs";

@Injectable()
export class PaymentService {
  constructor (private readonly httpService: HttpService) { }

  async makeCharge (data: any, authorization: any): Promise<any> {
    try {
      const DATA = {
        products: [
          {
            "name": "Logitech K380",
            "description": "Logitech K380 / Easy-Switch for Upto 3 Devices, Slim Bluetooth Tablet Keyboar ",
            "price": 10,
            "quantity": 1
          },
          {
            "name": "Logitech K380",
            "description": "Logitech K380 / Easy-Switch for Upto 3 Devices, Slim Bluetooth Tablet Keyboar ",
            "price": 10,
            "quantity": 1
          }],
        order: {
          "id": "202210101255255144669", // mandatory
          "description": "Purchase order received for Logitech K380 Keyboard", //mandatory
          "currency": "KWD", //mandatory
          "amount": 20 //mandatory
        },
        paymentGateway: { src: "knet" }, // knet, cc, samsung-pay, apple-pay, google-pay and create-invoice
        language: "en",
        reference: {
          id: "Refers to the order or transaction ID in your own system we will save your ID for our reference."
        },
        customer: {
          "uniqueId": "2129879kjbljg767881",
          "name": "Dharmendra Kakde",
          "email": "kakde.dharmendra@upayments.com",
          "mobile": "+96566336537"
        },
        returnUrl: "https://upayments.com/en/",
        cancelUrl: "https://error.com",
        notificationUrl: "https://webhook.site/d7c6e1c8-b98b-4f77-8b51-b487540df336",
        customerExtraData: "User define data"
      }
      const url = 'https://sandboxapi.upayments.com/api/v1/charge'

      const response: AxiosResponse<any> = await lastValueFrom(this.httpService.post(url, data, { headers: { authorization } }));

      // check is transcation done or not 
      return response.data;
    } catch (error) {    
      throw new HttpException(error.message, error.response.status);
    }
  }

}
