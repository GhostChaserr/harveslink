import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDatabaseService } from '../product/product.database.service';
import { CreateAuctionInput } from '../auction/auction.database.service.interface';
import { AuctionDatabaseService } from '../auction/auction.database.service';

@Injectable()
export class AuctionProductService {
  constructor(
    private readonly productDatabaseService: ProductDatabaseService,
    private readonly auctionDatabaseService: AuctionDatabaseService
  ) {}

  async createAuction(input: CreateAuctionInput) {
    const product = await this.productDatabaseService.readProduct({
      where: {
        id: input.productId,
      },
    });
    if (!product) throw new NotFoundException('product not found');
    input.product = product;
    input.account = product.account;

    const auction = await this.auctionDatabaseService.create(input);

    return auction;
  }
}
