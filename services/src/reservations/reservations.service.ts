import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Product } from '../entities/product.entity';
import { Reservation } from '../entities/reservation.entity';
import { ReservationStatusEnum } from '../enums/entities.enums';
import { ProductDatabaseService } from '../product/product.database.service';
import { AccountDatabaseService } from '../account/account.database.service';
import { ReservationsDatabaseService } from './reservations.database.service';

@Injectable()
export class ReservationsService {
  private readonly logger: Logger = new Logger(ReservationsService.name);
  constructor(
    private readonly productService: ProductDatabaseService,
    private readonly accountService: AccountDatabaseService,
    private readonly reservationsDatabaseService: ReservationsDatabaseService,

    private dataSource: DataSource
  ) {}

  async reserveProduct(
    productId: string,
    reservationId: string,
    count: number
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const product = await queryRunner.manager
        .getRepository(Product)
        .createQueryBuilder('p')
        .useTransaction(true)
        .setLock('pessimistic_write')
        .where('p.id = :id', { id: productId })
        .getOne();
      if (!product) {
        throw Error('no product');
      }
      await queryRunner.manager.update(
        Product,
        {
          id: productId,
        },
        {
          quantityAvailable: product?.quantityAvailable - count,
        }
      );
      await queryRunner.manager.update(
        Reservation,
        {
          id: reservationId,
        },
        {
          status: ReservationStatusEnum.ACCEPTED,
        }
      );
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  async create(productId: string, accountId: string) {
    this.logger.debug('product id:', productId);
    this.logger.debug('account id', accountId);

    const [account, product] = await Promise.all([
      this.accountService.readAccount({
        where: {
          id: accountId,
        },
      }),
      this.productService.readProduct({
        where: {
          id: productId,
        },
      }),
    ]);
    if (!product || !account) throw new NotFoundException('not found');

    this.logger.debug('product:', product);
    this.logger.debug('account:', account);

    const reservation = await this.reservationsDatabaseService.create({
      account,
      product,
    });

    this.logger.debug('reservation:', reservation);

    return reservation;
  }
}
