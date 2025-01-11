import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';
import { SECRET } from './auth.constants';
import { GqlExecutionContext } from '@nestjs/graphql';
import { jwtPayload } from './auth.interface';
import { AuthService } from './auth.service';

export const getRequestFromContext = (context: any) => {
  let ctxRequest;
  if (context.contextType === 'graphql') {
    const ctx = GqlExecutionContext.create(context);
    ctxRequest = ctx.getContext().req;
  } else {
    ctxRequest = context.switchToHttp().getRequest();
  }
  return ctxRequest;
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = getRequestFromContext(context);
    console.log('req:', request);
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = (await this.jwtService.verifyAsync(token, {
        secret: SECRET,
      })) as jwtPayload;

      const session = await this.authService.readSession(payload.id);
      console.log('SESSION:', session);
      request['session'] = session;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
