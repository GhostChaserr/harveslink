import { InputType, Field, Float } from '@nestjs/graphql';
import { Account } from '../entities/account.entity';
import { CategoryEnum, UnitEnum } from '../enums/entities.enums';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  productName: string;

  @Field(() => CategoryEnum)
  category: CategoryEnum; // optional because default is 'General'

  @Field(() => String)
  description: string;

  @Field(() => Float)
  price: number; // default 0 if not provided

  @Field(() => String)
  country: string;

  @Field(() => UnitEnum)
  unit: UnitEnum; 

  @Field(() => Float)
  quantityAvailable: number; // default 0

  @Field(() => Date)
  expiryDate: Date;

  account: Account;
}
