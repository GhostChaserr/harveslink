import { InputType, Field, Float } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';
import { AuctionStatus } from '../enums/entities.enums';
import { Account } from '../entities/account.entity';
import { AUCTIONS_TASKS } from './auctions.tasks.enums';

@InputType()
export class CreateAuctionInput {
  @Field(() => String)
  productId: string;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date)
  endDate: Date;

  @Field(() => Float)
  minBid: number;

  @Field(() => AuctionStatus)
  status: AuctionStatus;

  product: Product;
  account: Account;
}

@InputType()
export class CreateScheduledAuctionTaskInput {
  @Field(() => String)
  auctionId: string;

  @Field(() => Date)
  startDate: Date;
}

export class AuctionPhaseTaskInput {
  auctionId: string;
  date: Date;
}
