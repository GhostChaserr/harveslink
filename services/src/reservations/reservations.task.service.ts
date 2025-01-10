import { WorkerService } from 'nestjs-graphile-worker';
import {
  Controller,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { RESERVATION_TASKS } from './reservations.task.service.enums';

import { ReservationsService } from './reservations.service';
import { ProductReservationTaskPayload } from './reservations.task.service.interface';

@Controller()
export class ReservationsTasksService {
  private readonly logger: Logger = new Logger(ReservationsTasksService.name);
  constructor(
    private readonly graphileWorker: WorkerService,
    private readonly service: ReservationsService
  ) {}

  public async process(input: ProductReservationTaskPayload) {
    await this.service.reserveMultipleProducts(
      input.products,
      input.reservationId
    );
    this.logger.debug('input:', input);
  }

  public async create(input: ProductReservationTaskPayload) {
    try {
      const task = await this.graphileWorker.addJob(
        RESERVATION_TASKS.RESERVE_PRODUCT_TASK,
        input,
        {
          maxAttempts: 1,
          priority: 1,
          queueName: input.products.map((item) => item.id).join('-'),
          jobKey: input.reservationId,
        }
      );
      this.logger.debug('task:', task);

      return task.id;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('failed to reserve task');
    }
  }
}
