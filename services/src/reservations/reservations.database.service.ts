import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { nanoid } from 'nanoid';
import {
  ProductUsageDetails,
  Reservation,
} from '../entities/reservation.entity';

import { ReservationStatusEnum } from '../enums/entities.enums';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import {
  CreteProductsReservation,
  ProductToReserve,
} from './reservations.database.service.interface';

@Injectable()
export class ReservationsDatabaseService {
  private readonly logger: Logger = new Logger(
    ReservationsDatabaseService.name
  );
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>
  ) {}

  createProductUsageDetails(products: ProductToReserve[]): ProductUsageDetails {
    const details: Record<string, string> = {};

    products.forEach((product) => {
      /**
       * If each product in this array already has a "count" property
       * or similar, convert it to a string (as your details is Record<string, string>)
       */
      const countAsString = product.count?.toString() ?? '0'; // fallback to '0'
      details[product.id] = countAsString;
    });

    return { details };
  }

  createInstace(input: CreteProductsReservation) {
    const instance = this.reservationRepo.create();
    instance.createdAt = new Date();
    instance.products = input.products;
    instance.account = input.account;
    instance.productUsageDetails = this.createProductUsageDetails(
      input.maapings
    );
    instance.status = ReservationStatusEnum.PENDING;
    instance.code = nanoid(6).toUpperCase();
    return instance;
  }

  async paginate(
    options: IPaginationOptions,
    filter: FindOptionsWhere<Reservation>
  ): Promise<Pagination<Reservation>> {
    try {
      this.logger.debug('filter:', filter);
      const reservations = await paginate<Reservation>(
        this.reservationRepo,
        options,
        filter
      );
      this.logger.debug('products:', reservations.items);
      this.logger.debug('meta:', reservations.meta);
      return reservations;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('error:');
    }
  }

  async create(input: CreteProductsReservation) {
    try {
      const instance = this.createInstace(input);
      const record = await this.reservationRepo.save(instance);
      this.logger.debug('record:', record);

      return record;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
