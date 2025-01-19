import { Module } from '@nestjs/common';

import { ProductDatabaseService } from '../product/product.database.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from '../entities/product.entity';

import { AccountProductService } from '../account-product/account.product.service';
import { Auction, Bid } from '../entities/auction.entity';
import { AuctionProductService } from './auction-product.service';
import { AuctionDatabaseService } from '../auction/auction.database.service';
import { AccountDatabaseService } from '../account/account.database.service';
import { Account } from '../entities/account.entity';
import { BranchDatabaseService } from '../branch/branch.database.service';
import { CategoryDatabaseService } from '../category/category.database.service';
import { UnitDatabaseService } from '../unit/unit.database.servie';
import { Branch } from '../entities/branch.entity';
import { Unit } from '../entities/unit.entity';
import { Category } from '../entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Auction,
      Bid,
      Account,
      Branch,
      Unit,
      Category,
    ]),
  ],
  providers: [
    AccountDatabaseService,
    ProductDatabaseService,
    AccountProductService,
    CategoryDatabaseService,
    UnitDatabaseService,
    BranchDatabaseService,
    AuctionProductService,
    AuctionDatabaseService,
  ],
  exports: [AuctionProductService],
})
export class AuctionProductModule {}
