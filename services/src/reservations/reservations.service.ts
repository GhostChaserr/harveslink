import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DataSource, In } from 'typeorm';

import { Product } from '../entities/product.entity';
import { Reservation } from '../entities/reservation.entity';
import { ReservationStatusEnum } from '../enums/entities.enums';
import { ProductDatabaseService } from '../product/product.database.service';
import { AccountDatabaseService } from '../account/account.database.service';
import { ReservationsDatabaseService } from './reservations.database.service';
import { InputCreateProductsReservaton } from './reservations.database.service.interface';

@Injectable()
export class ReservationsService {
  private readonly logger: Logger = new Logger(ReservationsService.name);
  constructor(
    private readonly productService: ProductDatabaseService,
    private readonly accountService: AccountDatabaseService,
    private readonly reservationsDatabaseService: ReservationsDatabaseService,
    private dataSource: DataSource
  ) {}

  async reservations(productId: string) {
    this.logger.debug('product id:', productId);
    return this.reservationsDatabaseService.reservations({
      where: {
        products: {
          id: productId,
        },
      },
    });
  }

  async reserveMultipleProducts(
    products: { id: string; count: number }[],
    reservationId: string
  ) {
    this.logger.debug('products:', products);
    this.logger.debug('reservationId', reservationId);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Lock all needed products in a single query (FOR UPDATE).
      const productIds = products.map((p) => p.id);

      // Retrieve all products that match the given IDs, with a pessimistic lock
      const productEntities = await queryRunner.manager
        .getRepository(Product)
        .createQueryBuilder('p')
        .where('p.id IN (:...ids)', { ids: productIds })
        .setLock('pessimistic_write') // or .setLock('pessimistic_write', undefined, ['NOWAIT']) if needed
        .getMany();

      // 2. Verify all products exist and have enough quantity, then decrement
      for (const { id, count } of products) {
        const found = productEntities.find((p) => p.id === id);
        if (!found) {
          throw new Error(`Product with ID: ${id} not found.`);
        }
        if (found.quantityAvailable < count) {
          throw new Error(
            `Insufficient quantity for product [${found.id}] (needed ${count}, have ${found.quantityAvailable}).`
          );
        }
        found.quantityAvailable -= count;
        await queryRunner.manager.save(found);
      }

      // 3. Update the reservation status (optional: only if all products succeed)
      await queryRunner.manager.update(
        Reservation,
        { id: reservationId },
        { status: ReservationStatusEnum.ACCEPTED }
      );

      // 4. Commit the transaction if everything is fine
      await queryRunner.commitTransaction();

      // Return any data you want (e.g., updated product entities)
      return productEntities;
    } catch (error) {
      // Roll back the entire transaction if an error occurs
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Release the query runner (important to avoid leaks)
      await queryRunner.release();
    }
  }

  async create(input: InputCreateProductsReservaton) {
    const products = await this.productService.products({
      where: {
        id: In(input.products.map((product) => product.id)),
      },
    });
    if (products.length === 0) throw new NotFoundException('Product Not Found');

    const account = await this.accountService.readAccount({
      where: {
        id: input.accountId,
      },
    });

    if (!account) throw new NotFoundException('Not Found!');

    const reservation = await this.reservationsDatabaseService.create({
      products,
      account,
      maapings: input.products,
    });

    return reservation;
  }
}
