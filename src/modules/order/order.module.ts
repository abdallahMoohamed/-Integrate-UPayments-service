import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { PaymentService } from "../payment/payment.service";
import { HttpModule } from "@nestjs/axios";
import { productDBModule } from "src/DB/productDB/product.schema";
import { cartDBModule } from "src/DB/cartDB/cart.schema";
import { ProductDBService } from "src/DB/productDB/produt.db.service";
import { CartDbService } from "src/DB/cartDB/cart.db.service";
import { OrderDBService } from "src/DB/orderDB/order.db.service";
import { orderDBModule } from "src/DB/orderDB/order.schema";


@Module({
  imports: [HttpModule, productDBModule, cartDBModule, orderDBModule],
  controllers: [OrderController],
  providers: [OrderService, PaymentService, ProductDBService, CartDbService, OrderDBService]
})

export class OrderModule { }