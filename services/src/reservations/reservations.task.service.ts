import { WorkerService } from 'nestjs-graphile-worker';
import {
  Controller,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ReserveProductTaskPayload } from './reservations.task.service.interface';
import { RESERVATION_TASKS } from './reservations.task.service.enums';

import { ReservationsService } from './reservations.service';

@Controller()
export class ReservationsTasksService {
  private readonly logger: Logger = new Logger(ReservationsTasksService.name);
  constructor(
    private readonly graphileWorker: WorkerService,
    private readonly service: ReservationsService
  ) {}

  public async process(input: ReserveProductTaskPayload) {
    await this.service.reserveProduct(
      input.productId,
      input.reservationId,
      input.count
    );
    this.logger.debug('input:', input);
  }

  public async create(input: ReserveProductTaskPayload) {
    try {
      const task = await this.graphileWorker.addJob(
        RESERVATION_TASKS.RESERVE_PRODUCT_TASK,
        input,
        {
          maxAttempts: 1,
          priority: 1,
          queueName: input.productId,
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
