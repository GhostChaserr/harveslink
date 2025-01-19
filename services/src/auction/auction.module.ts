import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuctionDatabaseService } from './auction.database.service';
import { Auction, Bid } from '../entities/auction.entity';
import { AuctionTaskService } from './auctions.tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Auction, Bid])],
  providers: [AuctionDatabaseService, AuctionTaskService],
  exports: [AuctionDatabaseService, AuctionTaskService],
})
export class AuctionModule {}
