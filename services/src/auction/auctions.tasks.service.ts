import { WorkerService } from 'nestjs-graphile-worker';
import {
  Controller,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { CreateScheduledAuctionTaskInput } from './auction.database.service.interface';
import { AUCTIONS_TASKS } from './auctions.tasks.enums';
import { ReservationsTasksService } from '../reservations/reservations.task.service';

@Controller()
export class AuctionTaskService {
  private readonly logger: Logger = new Logger(ReservationsTasksService.name);
  constructor(private readonly graphileWorker: WorkerService) {}

  async createAuctionBiddingPhase(date: Date, auctionId: string) {
    try {
      const task = await this.graphileWorker.addJob(
        AUCTIONS_TASKS.AUCTION_PHASE_BIDDING,
        { auctionId, date },
        {
          maxAttempts: 1,
          priority: 1,
          jobKey: auctionId,
          runAt: date,
        }
      );
      return task.id;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('failed to reserve task');
    }
  }

  async createAuctionClosedPhase(date: Date, auctionId: string) {
    try {
      const task = await this.graphileWorker.addJob(
        AUCTIONS_TASKS.AUCTION_PHASE_CLOSED,
        { auctionId, date },
        {
          maxAttempts: 1,
          priority: 1,
          jobKey: auctionId,
          runAt: date,
        }
      );
      return task.id;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('failed to reserve task');
    }
  }


  public async create(input: CreateScheduledAuctionTaskInput) {
    try {
      const task = await this.graphileWorker.addJob(
        AUCTIONS_TASKS.SCHEDULE_AUCTION,
        input,
        {
          maxAttempts: 1,
          priority: 1,
          jobKey: input.auctionId,
          runAt: new Date(),
        }
      );
      return task.id;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('failed to reserve task');
    }
  }
}
