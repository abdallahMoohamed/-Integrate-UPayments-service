import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './modules/payment/payment.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [PaymentModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
