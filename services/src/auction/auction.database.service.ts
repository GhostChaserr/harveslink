import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

import { CreateAuctionInput } from './auction.database.service.interface';
import { Auction } from '../entities/auction.entity';
import { AuctionStatus } from '../enums/entities.enums';

@Injectable()
export class AuctionDatabaseService {
  private readonly logger: Logger = new Logger(AuctionDatabaseService.name);
  constructor(
    @InjectRepository(Auction)
    private readonly auctionRepository: Repository<Auction>
  ) {}

  public async readStatus(auctionId: string): Promise<AuctionStatus|null> {
    try {
      const auction = await this.auctionRepository.findOne({
        where: {
          id: auctionId,
        },
        select: {
          id: true,
          status: true,
        },
        relationLoadStrategy: undefined,
        relations: [],
      });
      if (!auction) return null;
      return auction?.status;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('readStatus');
    }
  }

  public async setAuctionStatus(auctionId: string, status: AuctionStatus) {
    try {
      const updated = await this.auctionRepository.update(
        {
          id: auctionId,
        },
        {
          status,
        }
      );
      return updated.affected;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('setAuctionStatus');
    }
  }

  public async readAuction(options: FindOneOptions<Auction>) {
    try {
      const auction = await this.auctionRepository.findOne(options);
      this.logger.debug('acc:', auction);
      return auction;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  createInstance(input: CreateAuctionInput): Auction {
    const auction = this.auctionRepository.create(input);
    auction.createdAt = new Date();
    auction.updatedAt = new Date();
    auction.bids = [];
    auction.product = input.product;
    auction.currentBid = 0;
    auction.endDate = input.endDate;
    auction.startDate = input.startDate;
    auction.minBid = input.minBid;
    auction.status = input.status;
    auction.account = input.account;
    return auction;
  }

  async create(input: CreateAuctionInput) {
    try {
      const insntace = this.createInstance(input);
      const row = await this.auctionRepository.save(insntace);
      this.logger.debug('record:', row);

      return row;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('failed to create auction');
    }
  }

  public async bulkCreate(auctions: Auction[]) {
    try {
      const records = await this.auctionRepository.save(auctions);
      this.logger.debug('recorsd:', records);
      return records;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
