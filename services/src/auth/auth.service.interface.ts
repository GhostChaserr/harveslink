import { ObjectType, Field } from "@nestjs/graphql";
import { AccountType } from "../enums/entities.enums";

@ObjectType()
export class Session {
  @Field(() => String)
  fullName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  profile: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => AccountType)
  accountType: AccountType;
}
