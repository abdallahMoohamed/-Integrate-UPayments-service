import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { PaymentService } from "../payment/payment.service";
import { HttpModule } from "@nestjs/axios";


@Module({
  imports: [HttpModule],
  controllers: [OrderController],
  providers: [OrderService, PaymentService]
})

export class OrderModule { }