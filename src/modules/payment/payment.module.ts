import { Module } from "@nestjs/common";
import { HttpModule } from '@nestjs/axios';
import { PaymentService } from "./payment.service";
/**
 * To use the HttpService, first import HttpModule .
 * If you don't import HttpModule in a module that needs to make HTTP requests,
 *  you'll get an error because the HttpService won't be available for injection.
 */
@Module({
  imports: [HttpModule],
  providers: [PaymentService]

})

export class PaymentModule { }