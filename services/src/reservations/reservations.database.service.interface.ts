import { ObjectType, Field } from '@nestjs/graphql';
import { PaginationMeta } from '../product/product.backoffice.service.interface';
import { Reservation } from '../entities/reservation.entity';

@ObjectType()
export class PaginatedReservations {
  @Field(() => [Reservation])
  items: Reservation[];

  @Field(() => PaginationMeta)
  meta: PaginationMeta;
}
