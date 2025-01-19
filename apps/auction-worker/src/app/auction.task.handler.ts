import { Injectable, Logger } from '@nestjs/common';
import { Task, TaskHandler } from 'nestjs-graphile-worker';
import {
  AuctionDatabaseService,
  AuctionPhaseTaskInput,
  AUCTIONS_TASKS,
  AuctionStatus,
  AuctionTaskService,
  CreateScheduledAuctionTaskInput,
} from 'services';
import { AuctionTaskProcessor } from './auction.task.processor';
import moment from 'moment';

@Injectable()
@Task(AUCTIONS_TASKS.SCHEDULE_AUCTION)
export class ScheduledAuctionTaskHandler {
  private logger = new Logger(ScheduledAuctionTaskHandler.name);

  constructor(private readonly processor: AuctionTaskProcessor) {}

  @TaskHandler()
  handler(payload: CreateScheduledAuctionTaskInput) {
    return this.processor.processScheduledAuctionTask(payload);
  }
}

@Injectable()
@Task(AUCTIONS_TASKS.AUCTION_PHASE_BIDDING)
export class AuctionBiddingTaskHandler {
  private logger = new Logger(ScheduledAuctionTaskHandler.name);

  constructor(
    private readonly service: AuctionDatabaseService,
    private readonly taskService: AuctionTaskService
  ) {}

  @TaskHandler()
  async handler(payload: AuctionPhaseTaskInput) {
    await this.service.setAuctionStatus(
      payload.auctionId,
      AuctionStatus.BIDDING
    );
    const closeStartDate = moment().add(60, 'seconds');
    await this.taskService.createAuctionClosedPhase(
      closeStartDate.toDate(),
      payload.auctionId
    );
    const status = await this.service.readStatus(payload.auctionId);
    this.logger.debug('Auction Bidding', payload, status);
  }
}

@Injectable()
@Task(AUCTIONS_TASKS.AUCTION_PHASE_CLOSED)
export class AuctionClosedTaskHandler {
  private logger = new Logger(ScheduledAuctionTaskHandler.name);

  constructor(
    private readonly service: AuctionDatabaseService
  ) {}

  @TaskHandler()
  async handler(payload: AuctionPhaseTaskInput) {
    await this.service.setAuctionStatus(
      payload.auctionId,
      AuctionStatus.CLOSED
    );
    const status = await this.service.readStatus(payload.auctionId);
    this.logger.debug('Auction Closed', payload, status);
  }
}
