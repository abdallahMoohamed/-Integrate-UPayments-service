import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Product } from "../productDB/product.schema";
import { Types } from "mongoose";


// class 
@Schema({ timestamps: true })
export class Order {

  @Prop({ type: [{}], required: true })
  products: [{ product: Product }]

  @Prop({ required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, maxlength: 11 })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  description: string
}

// schema factory
const orderSchema = SchemaFactory.createForClass(Order)

// module
export const orderDBModule = MongooseModule.forFeature([{ name: Order.name, schema: orderSchema }])