import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';


import { Unit } from '../entities/unit.entity';
import { CreateUnitInput } from './unit.database.service.interface';

@Injectable()
export class UnitDatabaseService {
  private readonly logger: Logger = new Logger(UnitDatabaseService.name);
  constructor(
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>
  ) {}

  public async readCategories(options: FindManyOptions<Unit>): Promise<Unit[]> {
    const units = await this.unitRepository.find(options);
    this.logger.debug('units:', units);
    return units;
  }

  public async readUnit(options: FindOneOptions<Unit>) {
    try {
      const record = await this.unitRepository.findOne(options);
      this.logger.debug('record:', record);
      return record;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  createInstance(input: CreateUnitInput): Unit {
    const instance = this.unitRepository.create();
    instance.name = input.name
    instance.createdAt = new Date();
    instance.products = [];
    instance.updatedAt = new Date();

    return instance;
  }

  public async create(input: CreateUnitInput) {
    const instance = this.createInstance(input);
    const record = await this.unitRepository.save(instance);

    this.logger.debug('record:', record);

    return record;
  }
}
