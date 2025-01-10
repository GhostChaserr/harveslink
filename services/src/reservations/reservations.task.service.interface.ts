import { InputType } from '@nestjs/graphql';
import { ProductToReserve } from './reservations.database.service.interface';



@InputType()
export class ProductReservationTaskPayload   {
  products: ProductToReserve[];
  accountId: string;
  reservationId: string;
}


