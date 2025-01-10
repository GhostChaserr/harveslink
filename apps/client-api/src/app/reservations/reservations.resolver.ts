import { Args, Mutation, Resolver } from '@nestjs/graphql';

import {
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
      input.accountId
    );
    input.reservationId = reservation.id;
    return this.taskService.create(input);
  }
}
