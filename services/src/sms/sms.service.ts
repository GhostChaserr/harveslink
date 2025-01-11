import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { HttpService } from '@nestjs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { Observable, catchError, map } from 'rxjs';
import { InputSendSms } from './sms.input';

@Injectable()
export class SmsService {
  public constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

  sendSMS(input: InputSendSms): Observable<AxiosResponse<void>> {
    const url = 'https://smsservice.inexphone.ge/api/v1/sms/one';
    return this.httpService
      .post(
        url,
        {
          phone: input.phone,
          subject: 'VERIFY CODE',
          message: input.body,
          ignore_blacklist: true,
        },
        {
          headers: {
            Authorization: `Bearer ${this.configService.get(
              'SMS_SERVICE_KEY'
            )}`,
          },
        }
      )
      .pipe(
        map((response: AxiosResponse) => {
          console.log(response.data);
          return response.data;
        }),
        catchError((error: AxiosError) => {
          console.error(error, error.response?.data);
          throw new Error('SMS_SEND_FAILED');
        })
      );
  }
}
