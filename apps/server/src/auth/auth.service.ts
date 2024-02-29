import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { UserService } from '../system/user/user.service';
import { ConfigService } from '@bee/config';
import { UserClaim } from './types';
import { DateUtil } from '../utils/date-util';
import { Algorithm, sign as jwtSign, verify as jwtVerify } from '@node-rs/jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    // private readonly emailService: EmailService,
  ) {}

  // 邮件登录
  // async emailLogin(dto: EmailLoginDto) {
  //   const user = await this.userService.findByAccount({
  //     email: dto.email,
  //   });
  //   // 校验邮箱登录验证码
  //   if (!(await this.emailService.verifyLoginCode(dto.email, dto.code))) {
  //     throw new UnauthorizedException('验证码错误');
  //   }
  //
  //   const loginData = await this.login(user);
  //
  //   // 删除邮件登录验证码
  //   await this.emailService.deleteLoginCode(dto.email);
  //
  //   return loginData;
  // }

  async login(user?: any | null) {
    if (!user) throw new NotFoundException('账号或者密码错误');

    return this.createToken({
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
    });
  }

  async createToken(userClaim: UserClaim) {
    const now = DateUtil.getUtcTimestamp();

    const expiresIn = this.configService.auth.accessTokenExpiresIn;

    const token = await jwtSign(
      {
        data: {
          id: userClaim.id,
          username: userClaim.username,
          email: userClaim.email,
          phone: userClaim.phone,
        },
        iat: now,
        exp: now + this.configService.auth.accessTokenExpiresIn,
        iss: this.configService.server_id,
        sub: userClaim.id,
        jti: randomUUID({
          disableEntropyCache: true,
        }),
        // aud: webUrl,
      },
      this.configService.auth.privateKey,
      {
        algorithm: Algorithm.ES256,
      },
    );

    return token;
  }

  async refreshToken(userClaim: UserClaim) {
    const now = DateUtil.getUtcTimestamp();

    return jwtSign(
      {
        data: userClaim,
        iat: now,
        exp: now + this.configService.auth.refreshTokenExpiresIn,
        iss: this.configService.server_id,
        sub: userClaim.id,
        jti: randomUUID({
          disableEntropyCache: true,
        }),
        // aud: webUrl,
      },
      this.configService.auth.privateKey,
      {
        algorithm: Algorithm.ES256,
      },
    );
  }

  async verifyToken(token: string) {
    try {
      const claims = await jwtVerify(token, this.configService.auth.publicKey, {
        algorithms: [Algorithm.ES256],
        iss: [this.configService.server_id],
        leeway: this.configService.auth.leeway,
        requiredSpecClaims: ['exp', 'iat', 'iss', 'sub'],
        // aud: [webUrl],
      });

      return claims.data as UserClaim;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
