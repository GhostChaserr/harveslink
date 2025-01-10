import { InputType, Field, Float } from '@nestjs/graphql';
import { Account } from '../entities/account.entity';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  productName: string;

  @Field(() => String)
  category: string; // optional because default is 'General'

  @Field(() => String)
  description: string;

  @Field(() => Float)
  price: number; // default 0 if not provided

  @Field(() => String)
  country: string; // default 'GEO'

  @Field(() => String)
  unit: string; // default 'kg'

  @Field(() => Float)
  quantityAvailable: number; // default 0

  @Field(() => Date)
  expiryDate: Date;

  account: Account;
}
