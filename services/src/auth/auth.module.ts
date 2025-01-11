import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../entities/account.entity';
import { OtpService } from '../otp/otp.service';
import { SmsService } from '../sms/sms.service';
import { SECRET } from './auth.constants';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { AccountDatabaseService } from '../account/account.database.service';
import { AccountService } from '../account/account.service';
import { JobService } from '../job/job.service';
import { Job } from '../entities/job.entity';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: SECRET,
      signOptions: { expiresIn: '2d' },
    }),
    ConfigModule.forRoot(),
    HttpModule,
    TypeOrmModule.forFeature([Account, Job]),
  ],
  controllers: [],
  providers: [JobService, AccountDatabaseService, AccountService, OtpService, SmsService, AuthService],
  exports: [AuthService, OtpService],
})
export class AuthModule {}
