import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '@prisma/client';
import errors from 'src/errors';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    console.log('email', email);
    console.log('password', password);

    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException(
        errors.ERROR_USER_NAME_OR_PASSWORD_NOT_CORRECT.message,
      );
    }
    return user;
  }
}
