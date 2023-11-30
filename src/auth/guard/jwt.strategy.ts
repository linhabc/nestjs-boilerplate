import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import configs from 'src/configs';

interface Jwtdecode {
  sub: string;
  name: string;
  roles: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configs.JWT_SECRET,
    });
  }

  async validate(payload: Jwtdecode) {
    return { userId: payload.sub, name: payload.name, roles: payload.roles };
  }
}
