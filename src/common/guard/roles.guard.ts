import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

import { ConfigsService } from '~/modules/configs/configs.service'
import { JWTService } from '~/processors/helper/helper.jwt.service'
import { getNestExecutionContextRequest } from '~/transformers/get-req.transformer'

import { AuthGuard } from './auth.guard'

/**
 * 区分游客和主人的守卫
 */

@Injectable()
export class RolesGuard extends AuthGuard implements CanActivate {
  constructor(
    protected readonly jwtService: JWTService,
    protected readonly configs: ConfigsService,
  ) {
    super(jwtService, configs)
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context)
    let isMaster = false
    try {
      await super.canActivate(context)
      isMaster = true
      // eslint-disable-next-line no-empty
    } catch {}

    request.isGuest = !isMaster
    request.isMaster = isMaster

    return true
  }

  getRequest(context: ExecutionContext) {
    return getNestExecutionContextRequest(context)
  }
}
