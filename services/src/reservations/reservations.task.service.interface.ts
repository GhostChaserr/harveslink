import { Field, InputType, Int } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';
import { Account } from '../entities/account.entity';

@InputType()
export class ReserveProductTaskPayload {
  @Field(() => String)
  productId: string;

  @Field(() => String)
  accountId: string;


  reservationId: string;

  @Field(() => Int)
  count: number;
}

@InputType()
export class ReservationCreateInput {
  product: Product;
  account: Account;
  count?: number;
}
