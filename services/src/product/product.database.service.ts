import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductInput } from './product.database.service.interface';

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ProductDatabaseService {
  private readonly logger: Logger = new Logger(ProductDatabaseService.name);
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  private defaultProductImage() {
    return 'product_image.png';
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Product>> {
    return paginate<Product>(this.productRepository, options);
  }

  createInstance(input: CreateProductInput) {
    const product = this.productRepository.create();
    product.productName = input.productName;
    product.category = input.category;
    product.country = input.country;
    product.createdAt = new Date();
    product.description = input.description;
    product.expiryDate = input.expiryDate;
    product.media = [
      this.defaultProductImage(),
      this.defaultProductImage(),
      this.defaultProductImage(),
    ];
    product.price = input.price;
    product.account = input.account;
    product.quantityAvailable = input.quantityAvailable;
    product.unit = input.unit;
    return product;
  }

  async create(input: CreateProductInput) {
    try {
      const instnace = this.createInstance(input);
      const record = await this.productRepository.save(instnace);
      this.logger.debug('record:', record);
      return record;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('error:');
    }
  }

  async readProduct(options: FindOneOptions<Product>) {
    try {
      const product = await this.productRepository.findOne(options);
      this.logger.debug('product:', product);
      return product;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('error:');
    }
  }

  public async bulkCreate(accounts: Product[]) {
    try {
      const records = await this.productRepository.save(accounts);
      this.logger.debug('recorsd:', records);
      return records;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
