import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { Branch } from '../entities/branch.entity';
import { CreateBranchInput } from './branch.database.service.interface';

@Injectable()
export class BranchDatabaseService {
  private readonly logger: Logger = new Logger(BranchDatabaseService.name);
  constructor(
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>
  ) {}

  public async readBranches(
    options: FindManyOptions<Branch>
  ): Promise<Branch[]> {
    const categories = await this.branchRepository.find(options);
    this.logger.debug('categories:', categories);
    return categories;
  }

  public async readBranch(options: FindOneOptions<Branch>) {
    try {
      const record = await this.branchRepository.findOne(options);
      this.logger.debug('record:', record);
      return record;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  createInstance(input: CreateBranchInput): Branch {
    const instance = this.branchRepository.create();
    instance.createdAt = new Date();
    instance.name = input.name;
    instance.city = input.city;
    instance.address = input.address;
    instance.country = input.country;
    instance.locationLat = input.locationLat;
    instance.locationLon = input.locationLon;
    instance.updatedAt = new Date();
    instance.account = input.account;
    instance.cover = 'branch_cover.webpg'
    return instance;
  }

  public async create(input: CreateBranchInput) {
    const instance = this.createInstance(input);
    const record = await this.branchRepository.save(instance);

    this.logger.debug('record:', record);

    return record;
  }
}
