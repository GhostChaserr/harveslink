import { Controller, Logger } from '@nestjs/common';
import {
  AuctionDatabaseService,
  AuctionStatus,
  AuctionTaskService,
  CreateScheduledAuctionTaskInput,
} from 'services';

import moment from 'moment';

@Controller()
export class AuctionTaskProcessor {
  private readonly logger: Logger = new Logger(AuctionTaskProcessor.name);
  constructor(
    private readonly taskService: AuctionTaskService,
    private readonly service: AuctionDatabaseService
  ) {}

  public async processScheduledAuctionTask(
    task: CreateScheduledAuctionTaskInput
  ) {
    await this.service.setAuctionStatus(task.auctionId, AuctionStatus.STARTED);
    const biddingStartDate = moment();
    await this.taskService.createAuctionBiddingPhase(
      biddingStartDate.toDate(),
      task.auctionId
    );
    const status = await this.service.readStatus(task.auctionId);
    this.logger.debug('Auction Bidding', task, status);
  }
}
