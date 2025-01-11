import { Injectable, Logger } from '@nestjs/common';

import { AccountDatabaseService } from './account.database.service';

@Injectable()
export class AccountService {
  private readonly logger: Logger = new Logger(AccountService.name);
  constructor(
    protected readonly accountDatabaseService: AccountDatabaseService
  ) {}
}
