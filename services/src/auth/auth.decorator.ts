import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getRequestFromContext } from './auth.guard';

export const SessionD = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = getRequestFromContext(ctx)
    return request.session;
  }
);
