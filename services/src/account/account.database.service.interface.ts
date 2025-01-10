import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { AccountType } from '../enums/entities.enums';

@InputType()
export class CreateAccountInput {
  @Field()
  fullName: string;

  @Field()
  email: string;
  

  @Field()
  password: string;

  @Field(() => AccountType, { defaultValue: AccountType.CONSUMER })
  accountType: AccountType;

  @Field()
  phone: string;

  @Field(() => Float, { nullable: true })
  locationLat?: number;

  @Field(() => Float, { nullable: true })
  locationLon?: number;

  @Field(() => Float, { defaultValue: 0 })
  ratingAverage?: number;

  @Field(() => Int, { defaultValue: 0 })
  reviewsCount?: number;
  
}
