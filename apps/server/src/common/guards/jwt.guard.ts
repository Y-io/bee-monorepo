import { Request } from 'express';
import { CanActivate, ContextType, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { isSkipAuth } from '../decorators';

// import { AuthService, UserService } from '@/modules/user/services';

@Injectable()
export class JwtGuard implements CanActivate {
  // constructor() {} // private readonly authService: AuthService, // private readonly userService: UserService,

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    const token = request.headers['authorization'] ?? '';
    const [type, jwt] = token.split(' ') ?? [];
    const contextType = context.getType<ContextType>();

    if (contextType === 'ws' && !jwt) {
      // ws 必须登录
      return false;
    }

    if (isSkipAuth(context)) {
      return true;
    }

    if (!jwt) {
      throw new UnauthorizedException();
    }

    // if (type === 'Bearer') {
    //   const payload = await this.authService.verifyToken(jwt);
    //
    //   try {
    //     // 查找到用户
    //     const user = await this.userService.findOne(payload.id);
    //
    //     if (!user) return false;
    //
    //     request.user = user;
    //
    //     return true;
    //   } catch (e) {
    //     return false;
    //   }
    // }

    return false;
  }
}
