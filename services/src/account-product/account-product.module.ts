import { Module } from '@nestjs/common';
import { AccountProductService } from './account.product.service';
import { AccountDatabaseService } from '../account/account.database.service';
import { ProductDatabaseService } from '../product/product.database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../entities/account.entity';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
import { CategoryDatabaseService } from '../category/category.database.service';
import { UnitDatabaseService } from '../unit/unit.database.servie';
import { Unit } from '../entities/unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Product, Category, Unit])],
  providers: [
    AccountDatabaseService,
    ProductDatabaseService,
    AccountProductService,
    CategoryDatabaseService,
    UnitDatabaseService,
  ],
  exports: [AccountProductService], // export if other modules need the ProductService
})
export class AccountProductModule {}
