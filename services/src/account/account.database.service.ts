import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
import { CreateAccountInput } from './account.database.service.interface';
import { AccountType } from '../enums/entities.enums';

@Injectable()
export class AccountDatabaseService {
  private readonly logger: Logger = new Logger(AccountDatabaseService.name);
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>
  ) {}

  public async readAccount(options: FindOneOptions<Account>) {
    try {
      const account = await this.accountRepository.findOne(options);
      this.logger.debug('acc:', account);
      return account;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  // CREATE
  createInstance(input: CreateAccountInput): Account {
    const account = this.accountRepository.create(input);
    account.fullName = input.fullName;
    account.email = input.email;
    account.password = input.password;
    account.accountType = input.accountType || AccountType.CONSUMER;
    account.phone = input.phone;
    account.locationLat = input.locationLat;
    account.locationLon = input.locationLon;
    account.ratingAverage = 0;
    account.reviewsCount = 0;
    account.createdAt = new Date();
    account.products = [];
    account.avatar = 'avatar.webpg';
    if (input.city) {
      account.city = input.city;
    }
    if (input.address) {
      account.address = input.address;
    }
    if (input.country) {
      account.country = input.country;
    }
    if (input.languages) {
      account.languages = input.languages;
  }
    return account;
  }

  public async create(input: CreateAccountInput) {
    try {
    const instance = this.createInstance(input);
      const record = await this.accountRepository.save(instance);
      this.logger.debug('record:', record);
      return record;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  public async bulkCreate(accounts: Account[]) {
    try {
      const records = await this.accountRepository.save(accounts);
      this.logger.debug('recorsd:', records);
      return records;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
