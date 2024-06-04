import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Types } from "mongoose";


export class CreateOrderDTO {

  @IsNotEmpty()
  user: Types.ObjectId;

  @IsNotEmpty()
  @Matches(/^(01)(0|1|2|5)[0-9]{8}$/)
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  address: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  description: string
}