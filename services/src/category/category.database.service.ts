import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryInput } from './category.database.service.interface';

@Injectable()
export class CategoryDatabaseService {
  private readonly logger: Logger = new Logger(CategoryDatabaseService.name);
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  public async readCategories(
    options: FindManyOptions<Category>
  ): Promise<Category[]> {
    const categories = await this.categoryRepository.find(options);
    this.logger.debug('categories:', categories);
    return categories;
  }

  public async readCategory(options: FindOneOptions<Category>) {
    try {
      const record = await this.categoryRepository.findOne(options);
      this.logger.debug('record:', record);
      return record;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  createInstance(input: CreateCategoryInput): Category {
    const instance = this.categoryRepository.create();
    instance.category = input.category;
    instance.createdAt = new Date();
    instance.products = [];
    instance.updatedAt = new Date();

    return instance;
  }

  public async create(input: CreateCategoryInput) {
    const instance = this.createInstance(input);
    const record = await this.categoryRepository.save(instance);

    this.logger.debug('record:', record);

    return record;
  }
}
