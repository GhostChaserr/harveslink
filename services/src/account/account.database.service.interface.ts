import { InputType, Field, Float, Int, PartialType } from '@nestjs/graphql';
import { AccountType } from '../enums/entities.enums';

@InputType()
export class CreateAccountInput {
  @Field(() => String)
  fullName: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => AccountType, { defaultValue: AccountType.CONSUMER })
  accountType?: AccountType;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => Float, { nullable: true })
  locationLat?: number;

  @Field(() => Float, { nullable: true })
  locationLon?: number;

  @Field(() => Float, { defaultValue: 0 })
  ratingAverage?: number;

  @Field(() => Int, { defaultValue: 0 })
  reviewsCount?: number;

  @Field(() => Float)
  otp: number;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => String, { nullable: true })
  city?: string;

  @Field(() => String, { nullable: true })
  address?: string;

  @Field(() => [String], { nullable: true })
  languages?: string[];
}

@InputType()
export class CreateFarmerAccountInput extends PartialType(CreateAccountInput) {
  @Field(() => String)
  override fullName: string;

  @Field(() => String)
  override phone: string;

  @Field(() => Float)
  override otp: number;

  @Field(() => String)
  override country: string;

  @Field(() => String)
  override city: string;

  @Field(() => String)
  override address: string;

  @Field(() => [String])
  override languages: string[];
}
