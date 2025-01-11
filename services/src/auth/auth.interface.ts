import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthPayload {
  @Field(() => String)
  accessToken: string;
  @Field(() => String)
  accountType: string;
}

@ObjectType()
export class jwtPayload {
  @Field(() => String)
  id: string;
  @Field(() => Int)
  iat: number;
  @Field(() => Int)
  exp: number;
}
