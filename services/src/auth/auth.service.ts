import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from './auth.interface';

import { OtpService } from '../otp/otp.service';
import { AccountDatabaseService } from '../account/account.database.service';
import { CreateAccountInput } from '../account/account.database.service.interface';
import { Session } from './auth.service.interface';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger();
  constructor(
    private accountDatabaseService: AccountDatabaseService,
    private jwtService: JwtService,
    private otpService: OtpService
  ) {}

  async readSession(accountId: string): Promise<Session> {
    this.logger.debug('accountId:', accountId);
    const account = await this.accountDatabaseService.readAccount({
      where: {
        id: accountId,
      },
      relations: [],
    });
    if (!account) throw new NotFoundException('account not found');

    const session: Session = {
      id: account.id,
      email: account.email,
      fullName: account.fullName,
      phone: account.phone,
      profile: 'profile.png',
      accountType: account.accountType,
      createdAt: account.createdAt,
    };

    return session;
  }

  async signIn(phone: string): Promise<AuthPayload> {
    const account = await this.accountDatabaseService.readAccount({
      where: {
        phone,
      },
    });
    if (!account) throw new BadRequestException('CUSTOMER NOT FOUND');

    try {
      const accessToken = await this.jwtService.signAsync({
        id: account.id,
      });

      return {
        accessToken,
        accountType: account.accountType,
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('FAILED TO AUTHENTICATE');
    }
  }

  async check(phone: string) {
    const account = await this.accountDatabaseService.readAccount({
      where: {
        phone,
      },
    });
    if (!account) return false;
    return true;
  }

  async signUp(input: CreateAccountInput) {
    let account = await this.accountDatabaseService.readAccount({
      where: {
        phone: input.phone,
      },
    });
    if (account !== null) {
      this.logger.error(account);
      throw new BadRequestException('ACCOUNT EXISTS');
    }

    if (input.password) {
      const hash = await bcrypt.hash(input.password, 10);
      input.password = hash;
    }

    account = await this.accountDatabaseService.create(input);

    try {
      const accessToken = await this.jwtService.signAsync({
        id: account.id,
      });

      return {
        accessToken,
        accountType: account.accountType,
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('FAILED TO AUTHENTICATE');
    }
  }

  async requestSignIn(phone: string): Promise<boolean> {
    const account = await this.accountDatabaseService.readAccount({
      where: {
        phone,
      },
    });
    if (!account) throw new BadRequestException('Account Not Found');
    await this.otpService.create(phone);
    return true;
  }
}
