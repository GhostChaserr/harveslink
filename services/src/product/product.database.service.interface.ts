import { InputType, Field, Float, PartialType } from '@nestjs/graphql';
import { Account } from '../entities/account.entity';

import { Category } from '../entities/category.entity';
import { Unit } from '../entities/unit.entity';
import { Branch } from '../entities/branch.entity';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  productName: string;

  @Field(() => String)
  categoryId: string;

  @Field(() => String, { nullable: true })
  branchId?: string;

  @Field(() => String)
  unitId: string;

  @Field(() => String)
  description: string;

  @Field(() => Float)
  price: number;

  @Field(() => String)
  country: string;

  @Field(() => Float)
  quantityAvailable: number;

  @Field(() => Date)
  expiryDate: Date;

  @Field(() => Date)
  startDate: Date;

  unit: Unit;
  account: Account;
  branch?: Branch
  category: Category;
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
