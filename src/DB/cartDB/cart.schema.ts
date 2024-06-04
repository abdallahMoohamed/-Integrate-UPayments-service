import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

// class 
@Schema({ timestamps: true })
export class Cart {

  @Prop({ required: true })
  userId: Types.ObjectId

  @Prop({ required: true })
  products: [{
    productId: Types.ObjectId,
    quantity: number,
    price: number
  }];


}

// schema factory
const cartSchema = SchemaFactory.createForClass(Cart)

// module
export const cartDBModule = MongooseModule.forFeature([{ name: Cart.name, schema: cartSchema }])