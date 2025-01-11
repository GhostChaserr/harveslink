import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from '../entities/branch.entity';
import { BranchDatabaseService } from './branch.database.service';
import { BranchService } from './branch.service';
import { Account } from '../entities/account.entity';
import { AccountDatabaseService } from '../account/account.database.service';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, Account])],
  providers: [BranchDatabaseService, BranchService, AccountDatabaseService],
  exports: [BranchDatabaseService, BranchService],
})
export class BranchModule {}
