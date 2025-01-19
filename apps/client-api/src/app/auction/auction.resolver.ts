import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import {
  Auction,
  AuctionProductService,
  AuctionTaskService,
  AuthGuard,
  CreateAuctionInput,
  Session,
  SessionD,
} from 'services';

@UseGuards(AuthGuard)
@Resolver(() => Auction)
export class AuctionResolver {
  constructor(
    private readonly auctionProductService: AuctionProductService,
    private readonly auctionTaskService: AuctionTaskService
  ) {}

  @Mutation(() => Auction, { name: 'createAuction' })
  async createAuction(
    @SessionD() session: Session,
    @Args('input') input: CreateAuctionInput
  ): Promise<Auction> {
    const auction = await this.auctionProductService.createAuction(input);
    await this.auctionTaskService.create({
      auctionId: auction.id,
      startDate: auction.startDate,
    });
    return auction;
  }
}
