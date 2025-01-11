import { Field, Float, InputType } from '@nestjs/graphql';
import { Account } from '../entities/account.entity';

@InputType()
export class CreateBranchInput {
  @Field(() => String)
  country: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  address: string;

  @Field(() => String)
  name: string;

  @Field(() => Float, { nullable: true })
  locationLat?: number;

  @Field(() => Float, { nullable: true })
  locationLon?: number;

  account: Account
}
