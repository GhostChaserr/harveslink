import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards, BadRequestException } from '@nestjs/common';

import {
  AuthService,
  OtpService,
  AuthPayload,
  CreateAccountInput,
  AuthGuard,
  SessionD,
  Session,
} from 'services';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly otpService: OtpService
  ) {}

  private async validateOTP(phone: string, code: number) {
    const isOtpValid = await this.otpService.validate(phone, code);
    if (!isOtpValid) throw new BadRequestException('INVALID OTP');
  }

  @Mutation(() => AuthPayload, { name: 'signUp' })
  async signUp(
    @Args('input') input: CreateAccountInput,
    @Args('code') code: number
  ) {
    await this.validateOTP(input.phone, code);
    return this.authService.signUp(input);
  }

  @Mutation(() => Boolean, { name: 'checkAccount' })
  async checkAccount(@Args('phone') phone: string) {
    return this.authService.check(phone);
  }

  @Mutation(() => Boolean, { name: 'generateOtp' })
  async generateOtp(@Args('phone') phone: string) {
    return this.otpService.create(phone);
  }

  @Mutation(() => AuthPayload, { name: 'signIn' })
  async signIn(@Args('phone') phone: string, @Args('code') code: number) {
    await this.validateOTP(phone, code);
    return this.authService.signIn(phone);
  }

  @UseGuards(AuthGuard)
  @Query(() => Session, { name: 'session' })
  session(@SessionD() session: Session) {
    return session;
  }
}
