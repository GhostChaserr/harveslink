import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { WorkerService } from 'nestjs-graphile-worker';
import { OTP_TASK, OTP_TASKS_QUEUE } from './otp.constants';
import { OtpTaskPayload } from './otp.interface';
import { JobService } from '../job/job.service';
import { SmsService } from '../sms/sms.service';
import { lastValueFrom } from 'rxjs';

// import * as moment from 'moment';
// import { InjectDataSource } from '@nestjs/typeorm';
// import { DataSource } from 'typeorm';
// import ShortUniqueId = require('short-unique-id');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { customOtpGen } = require('otp-gen-agent');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

@Injectable()
export class OtpService {
  private logger: Logger = new Logger(OtpService.name);
  constructor(
    private readonly graphileWorker: WorkerService,
    private readonly jobService: JobService,
    private readonly smsService: SmsService
  ) {}

  async read(phone: string) {
    return this.jobService.readJob('phone', phone);
  }

  async delete(id: string) {
    return this.jobService.delete(id);
  }

  async create(phone: string) {
    try {
      const code = await customOtpGen({ length: 4 });
      this.logger.log('OTP SEND:', code);
      this.logger.log('PHONE:', phone);
      const payload: OtpTaskPayload = { phone, code, verified: false };
      await this.graphileWorker.addJob(OTP_TASK, payload, {
        priority: 0,
        queueName: OTP_TASKS_QUEUE,
        maxAttempts: 1,
        jobKey: payload.phone,
        runAt: moment().add(5, 'minutes').toDate(),
      });
      console.log('code:', code);
      return true;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('FAILED TO GENERATE OTP');
    }
  }

  async validate(phone: string, otp: number) {
    const job = await this.jobService.readJob('phone', phone);
    if (!job) throw new BadRequestException('OTP CODE NOT FOUND');
    try {
      const storedOtp = parseInt(job?.payload['code']);
      return storedOtp === otp;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }
}
