import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  // CREATE
  async create(createData: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(createData);
    return this.productRepository.save(product);
  }

  // READ (All)
  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }
}
