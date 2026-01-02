import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { TokenPayload } from '../dto/token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          console.log('🚀 ~ JwtStrategy ~ constructor ~ req:', req);
          return req?.cookies?.Authentication || req?.token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('AUTH_JWT_SECRET'),
    });
  }

  async validate(payload: TokenPayload) {
    return {
      userId: payload.userId,
      email: payload.email,
    };
  }
}
