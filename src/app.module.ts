import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './modules/payment/payment.module';
import { OrderModule } from './modules/order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv'
dotenv.config()

@Module({
  imports: [
    MongooseModule.forRoot(`${process.env.DB_CONNECTION}`),
    PaymentModule, OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
