import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { CategoryDatabaseService } from './category.database.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryDatabaseService],
  exports: [CategoryDatabaseService],
})
export class CategoryModule {}