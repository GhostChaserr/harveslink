import { ObjectType, Field, Float, InputType } from '@nestjs/graphql';
import { PaginationMeta } from '../product/product.backoffice.service.interface';
import { Reservation } from '../entities/reservation.entity';
import { Product } from '../entities/product.entity';
import { Account } from '../entities/account.entity';

@ObjectType()
export class PaginatedReservations {
  @Field(() => [Reservation])
  items: Reservation[];

  @Field(() => PaginationMeta)
  meta: PaginationMeta;
}

@InputType()
export class ProductToReserve {
  @Field(() => String)
  id: string;

  @Field(() => Float)
  count: number;
}

@InputType()
export class InputCreateProductsReservaton {
  
  @Field(() => [ProductToReserve])
  products: ProductToReserve[];

  @Field(() => String)
  accountId: string;
}

@ObjectType()
export class CreteProductsReservation {
  @Field(() => [Product])
  products: Product[];
  @Field(() => [ProductToReserve])
  maapings: ProductToReserve[];
  @Field(() => Account)
  account: Account;
}
