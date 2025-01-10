import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../entities/reservation.entity';
import { ReservationCreateInput } from './reservations.task.service.interface';
import { ReservationStatusEnum } from '../enums/entities.enums';

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
    instance.status = ReservationStatusEnum.PENDING
    return instance;
  }



  async create(input: ReservationCreateInput) {
    try {
      const instance = this.createInstace(input);
      const record = await this.reservationRepo.save(instance);
      this.logger.debug('record:', record)

      return record;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
