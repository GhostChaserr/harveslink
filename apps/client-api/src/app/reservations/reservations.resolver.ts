import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  InputCreateProductsReservaton,
  ReservationsService,
  ReservationsTasksService,
  Reservation,
} from 'services';

@Resolver()
export class ReservationsResolver {
  constructor(
    protected readonly taskService: ReservationsTasksService,
    protected readonly reservationService: ReservationsService
  ) {}

  @Query(() => [Reservation], { name: 'reservations' })
  async reservations(@Args('productId') productId: string) {
    return this.reservationService.reservations(productId);
  }

  @Mutation(() => String, { name: 'createProductReservationRequest' })
  async create(
    @Args('input') input: InputCreateProductsReservaton
  ): Promise<string> {
    // case. create reservation request record with pending status
    const reservation = await this.reservationService.create(input);

    // case. push a task to decrease a stock
    return this.taskService.create({
      products: input.products,
      reservationId: reservation.id,
      accountId: input.accountId,
    });
  }
}
