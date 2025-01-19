import { Injectable, Logger } from '@nestjs/common';
import { Task, TaskHandler } from 'nestjs-graphile-worker';
import { AUCTIONS_TASKS, CreateScheduledAuctionTaskInput } from 'services';

@Injectable()
@Task(AUCTIONS_TASKS.SCHEDULE_AUCTION)
export class ScheduleAuctionTaskHandler {
  private logger = new Logger(ScheduleAuctionTaskHandler.name);

  @TaskHandler()
  handler(payload: CreateScheduledAuctionTaskInput) {
    this.logger.log(`ScheduleAuctionTaskHandler: ${JSON.stringify(payload)}`);
  }
}
