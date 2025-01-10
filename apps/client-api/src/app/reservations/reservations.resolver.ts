import { Args, Mutation, Resolver } from '@nestjs/graphql';

import {
  InputCreateProductsReservaton,
  ReservationsService,
  ReservationsTasksService,
} from 'services';

@Resolver()
export class ReservationsResolver {
  constructor(
    protected readonly taskService: ReservationsTasksService,
    protected readonly reservationService: ReservationsService
  ) {}

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
