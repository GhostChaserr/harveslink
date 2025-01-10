import { Module } from '@nestjs/common';
import { AccountProductService } from './account.product.service';
import { AccountDatabaseService } from '../account/account.database.service';
import { ProductDatabaseService } from '../product/product.database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../entities/account.entity';
import { Product } from '../entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Product])],
  providers: [
    AccountDatabaseService,
    ProductDatabaseService,
    AccountProductService,
  ],
  exports: [AccountProductService], // export if other modules need the ProductService
})
export class AccountProductModule {}
