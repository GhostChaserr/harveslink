import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsTasksService } from './reservations.task.service';
import { Product } from '../entities/product.entity';
import { ProductDatabaseService } from '../product/product.database.service';
import { Account } from '../entities/account.entity';
import { Category } from '../entities/category.entity';
import { Unit } from '../entities/unit.entity';
import { AccountDatabaseService } from '../account/account.database.service';
import { ReservationsService } from './reservations.service';
import { ReservationsDatabaseService } from './reservations.database.service';
import { Reservation } from '../entities/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Product, Category, Unit, Reservation])],
  providers: [
    ProductDatabaseService,
    ReservationsTasksService,
    AccountDatabaseService,
    ReservationsService,
    ReservationsDatabaseService,
  ],
  exports: [
    ReservationsTasksService,
    ReservationsService,
    ReservationsDatabaseService,
  ],
})
export class ReservationsModule {}
