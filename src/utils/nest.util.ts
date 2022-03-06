import { ExecutionContext } from '@nestjs/common'
import type { FastifyRequest } from 'fastify'
import type { UserModel } from '~/modules/user/user.model'
export function getNestExecutionContextRequest(
  context: ExecutionContext,
): FastifyRequest & { user?: UserModel } & KV {
  return context.switchToHttp().getRequest<FastifyRequest>()
  // if (req) {
  //   return req
  // }
  // const ctx = GqlExecutionContext.create(context)
  // return ctx.getContext().req
}
