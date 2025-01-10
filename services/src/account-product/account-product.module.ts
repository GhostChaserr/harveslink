import { Module } from '@nestjs/common';
import { AccountProductService } from './account.product.service';
import { AccountDatabaseService } from '../account/account.database.service';
import { ProductDatabaseService } from '../product/product.database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../entities/account.entity';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
import { CategoryDatabaseService } from '../category/category.database.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Product, Category])],
  providers: [
    AccountDatabaseService,
    ProductDatabaseService,
    AccountProductService,
    CategoryDatabaseService,
  ],
  exports: [AccountProductService], // export if other modules need the ProductService
})
export class AccountProductModule {}
