import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitDatabaseService } from './unit.database.servie';
import { Unit } from '../entities/unit.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Unit])],
  providers: [UnitDatabaseService],
  exports: [UnitDatabaseService],
})
export class UnitModule {}