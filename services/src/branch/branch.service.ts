import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateBranchInput } from './branch.database.service.interface';
import { BranchDatabaseService } from './branch.database.service';
import { AccountDatabaseService } from '../account/account.database.service';

@Injectable()
export class BranchService {
  private readonly logger: Logger = new Logger(BranchService.name);
  constructor(
    private readonly branchDatabaseService: BranchDatabaseService,
    protected readonly accountDatabaseService: AccountDatabaseService
  ) {}

  public async create(accountId: string, input: CreateBranchInput) {
    this.logger.debug('accountId:', accountId);
    this.logger.debug('input:', input);

    const account = await this.accountDatabaseService.readAccount({
      where: {
        id: accountId,
      },
      relations: [],
    });
    console.log('account:', account);
    if (!account) throw new NotFoundException('Account not found');

    input.account = account;
    const record = await this.branchDatabaseService.create(input);

    this.logger.debug('record:', record);

    return record;
  }
}
