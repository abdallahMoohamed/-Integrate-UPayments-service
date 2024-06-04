import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

// class 
@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: 0 })
  price: number;

  @Prop({ required: true, default: 0 })
  quantity: number;

}

// schema factory
const productSchema = SchemaFactory.createForClass(Product) 

// module
export const productDBModule = MongooseModule.forFeature([{ name: Product.name, schema: productSchema }])