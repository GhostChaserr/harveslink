import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../entities/account.entity';
import { AccountDatabaseService } from './account.database.service';
import { AccountService } from './account.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountDatabaseService, AccountService],
  exports: [AccountDatabaseService, AccountService],
})
export class AccountModule {}
