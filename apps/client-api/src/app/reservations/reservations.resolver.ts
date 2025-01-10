import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  PaginatedReservations,
  ReservationsService,
  ReservationsTasksService,
  ReserveProductTaskPayload,
} from 'services';

@Resolver()
export class ReservationsResolver {
  constructor(
    protected readonly taskService: ReservationsTasksService,
    protected readonly reservationService: ReservationsService
  ) {}

  @Mutation(() => String, { name: 'createProductReservationRequest' })
  async create(
    @Args('input') input: ReserveProductTaskPayload
  ): Promise<string> {
    const reservation = await this.reservationService.create(
      input.productId,
      input.accountId,
      input.count
    );
    input.reservationId = reservation.id;
    return this.taskService.create(input);
  }

  @Query(() => PaginatedReservations)
  async reservations(
    @Args('productId') productId: string,
    @Args('page') page: number,
    @Args('limit') limit: number
  ) {
    return this.reservationService.productReservations(page, limit, productId);
  }
}
