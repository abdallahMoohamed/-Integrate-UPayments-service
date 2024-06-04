import { Body, Controller, Headers, HttpException, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { PaymentService } from "./payment.service";

@Controller('pay')
export class PaymentController {
  constructor (private readonly _paymentService: PaymentService) { }

  @Post()
  async postData (@Request() request: Request) {
    try {
      const response = await this._paymentService.makeCharge(request.body, request.headers['authorization']);
      return response;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}

/**
 * "products": [
        {
            "name": "Logitech K380",
            "description": "Logitech K380 / Easy-Switch for Upto 3 Devices, Slim Bluetooth Tablet Keyboar ",
            "price": 10,
            "quantity": 1
        },
        {
            "name": "Logitech M171 Wireless Optical Mouse",
            "description": "Logitech M171 Wireless Optical Mouse  (2.4GHz Wireless, Blue Grey)",
            "price": 10,
            "quantity": 1
        }
    ],
    "order": {
        "id": "202210101255255144669",
        "reference": "11111991",
        "description": "Purchase order received for Logitech K380 Keyboard",
        "currency": "KWD",
        "amount": 20
    },
    "paymentGateway": {
        "src": "knet"
    },
    "language": "en",
    "reference": {
        "id": "202210101202210101"
    },
    "customer": {
        "uniqueId": "2129879kjbljg767881",
        "name": "Dharmendra Kakde",
        "email": "kakde.dharmendra@upayments.com",
        "mobile": "+96566336537"
    },
    "returnUrl": "https://upayments.com/en/",
    "cancelUrl": "https://error.com",
    "notificationUrl": "https://webhook.site/d7c6e1c8-b98b-4f77-8b51-b487540df336",
    "customerExtraData": "User define data"
 */