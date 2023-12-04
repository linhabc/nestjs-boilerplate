import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import configs from 'src/configs';
import { JwtDecodeEntity, Jwtdecode } from '../entity/jwt-decode.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configs.JWT_SECRET,
    });
  }

  async validate(payload: Jwtdecode): Promise<JwtDecodeEntity> {
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      roles: payload.roles,
    };
  }
}
