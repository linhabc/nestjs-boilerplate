import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import environment from 'src/environment';
import { JwtDecodeEntity, Jwtdecode } from '../entity/jwt-decode.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment().JWT_SECRET,
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
