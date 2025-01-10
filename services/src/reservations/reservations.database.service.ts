import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { nanoid } from 'nanoid';
import { Reservation } from '../entities/reservation.entity';
import { ReservationCreateInput } from './reservations.task.service.interface';
import { ReservationStatusEnum } from '../enums/entities.enums';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ReservationsDatabaseService {
  private readonly logger: Logger = new Logger(
    ReservationsDatabaseService.name
  );
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>
  ) {}

  createInstace(input: ReservationCreateInput) {
    this.logger.debug('createInstace:', input);
    const instance = this.reservationRepo.create();
    instance.createdAt = new Date();
    instance.product = input.product;
    instance.account = input.account;
    if (input?.count) {
      instance.count = input.count;
    }
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

  async create(input: ReservationCreateInput) {
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
