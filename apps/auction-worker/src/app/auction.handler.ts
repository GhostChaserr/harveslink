import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AuctionDatabaseService, AuctionStatus } from 'services';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

@Injectable()
export class AuctionHandler {
  private logger = new Logger(AuctionHandler.name);
  constructor(
    private readonly auctionDatabaseService: AuctionDatabaseService
  ) {}

  public async moveState(auctionId: string) {
    const status = await this.auctionDatabaseService.readStatus(auctionId);
    if (!status) {
      throw new InternalServerErrorException('no status!');
    }

    switch (status) {
      case AuctionStatus.BIDDING:
        this.handleClose(auctionId);
        break;

      case AuctionStatus.STARTED:
        this.handleBidding(auctionId);
        break;

      default:
        this.logger.error(`Unknown status: ${status}`, auctionId);
        break;
    }
  }

  public async handleBidding(auctionId: string) {
    await this.auctionDatabaseService.setAuctionStatus(
      auctionId,
      AuctionStatus.BIDDING
    );
    this.logger.debug('phase: bidding', auctionId);
    await sleep(30_000);
    await this.moveState(auctionId);
  }

  public async handleClose(auctionId: string) {
    await this.auctionDatabaseService.setAuctionStatus(
      auctionId,
      AuctionStatus.CLOSED
    );
    this.logger.debug('phase: closed', auctionId);
    this.logger.debug('Auction Ended', auctionId);
  }

  public async init(auctionId: string) {
    await this.auctionDatabaseService.setAuctionStatus(
      auctionId,
      AuctionStatus.STARTED
    );
    this.logger.debug('phase: started', auctionId);
    await sleep(10_000);
    await this.moveState(auctionId);
  }
}
