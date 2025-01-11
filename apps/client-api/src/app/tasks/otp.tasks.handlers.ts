import { Injectable, Logger } from '@nestjs/common';
import { Task, TaskHandler } from 'nestjs-graphile-worker';
import { OTP_TASK, OtpTaskPayload } from 'services';

@Injectable()
@Task(OTP_TASK)
export class OtpTaskHandler {
  private logger = new Logger(OtpTaskHandler.name);

  @TaskHandler()
  handler(payload: OtpTaskPayload) {
    this.logger.log(`OTP EXPIRED: ${JSON.stringify(payload)}`);
  }
}
