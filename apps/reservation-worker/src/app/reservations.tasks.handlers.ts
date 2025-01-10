import { Injectable } from '@nestjs/common';
import { Task, TaskHandler } from 'nestjs-graphile-worker';

import {
  ProductReservationTaskPayload,
  RESERVATION_TASKS,
  ReservationsTasksService,
} from 'services';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Injectable()
@Task(RESERVATION_TASKS.RESERVE_PRODUCT_TASK)
export class ReservationsTasksHandler {
  constructor(
    private readonly reservationsTaskService: ReservationsTasksService
  ) {}

  @TaskHandler()
  async handler(task: ProductReservationTaskPayload) {
    await this.reservationsTaskService.process(task);
  }
}
