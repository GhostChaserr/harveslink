import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductService } from './product.service';
import { Product } from '../entities/product.entity';
import { ProductBackOfficeService } from './product.backoffice.service';
import { ProductDatabaseService } from './product.database.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductService, ProductBackOfficeService, ProductDatabaseService],
  exports: [ProductService, ProductBackOfficeService, ProductDatabaseService], // export if other modules need the ProductService
})
export class ProductModule {}
