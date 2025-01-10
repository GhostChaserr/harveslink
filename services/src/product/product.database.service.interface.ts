import { InputType, Field, Float, PartialType } from '@nestjs/graphql';
import { Account } from '../entities/account.entity';
import { CategoryEnum, UnitEnum } from '../enums/entities.enums';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  productName: string;

  @Field(() => CategoryEnum)
  category: CategoryEnum;

  @Field(() => String)
  description: string;

  @Field(() => Float)
  price: number;

  @Field(() => String)
  country: string;

  @Field(() => UnitEnum)
  unit: UnitEnum;

  @Field(() => Float)
  quantityAvailable: number; 

  @Field(() => Date)
  expiryDate: Date;

  account: Account;
}

@InputType()
export class CreateProductFilterInput extends PartialType(CreateProductInput) {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => Float, { nullable: true })
  priceGte?: number;

  @Field(() => Float, { nullable: true })
  priceLte?: number;

  @Field(() => Float, { nullable: true })
  quantityAvailableGte?: number;

  @Field(() => Float, { nullable: true })
  quantityAvailableLte?: number;

  @Field(() => Date, { nullable: true })
  expiryDateGte?: Date;

  @Field(() => Date, { nullable: true })
  expiryDateLte?: Date;
}
