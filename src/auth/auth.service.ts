import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import errors from 'src/common/errors';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  bcryptSaltRounds = 10;

  async signUp(data: CreateUserDto) {
    const { password } = data;
    const encryptedPass = await bcrypt.hash(password, this.bcryptSaltRounds);
    return await this.userService.create({ ...data, password: encryptedPass });
  }

  async login(user: User) {
    return {
      access_token: await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
        name: user.name,
        roles: user.roles,
      }),
    };
  }

  async validateUser(email: string, password: string) {
    const exist = await this.userService.findOneByEmail(email);
    if (!exist) throw new NotFoundException("User doesn't exist");

    const comparedPass = await bcrypt.compare(password, exist.password);
    if (!comparedPass)
      throw new UnauthorizedException(
        errors.ERROR_USER_NAME_OR_PASSWORD_NOT_CORRECT.message,
      );

    delete exist.password;
    return exist;
  }

  async changePassword(email: string, oldPass: string, newPass: string) {
    const existUser = await this.validateUser(email, oldPass);

    const encryptedPass = await bcrypt.hash(newPass, this.bcryptSaltRounds);

    const updatedUser = await this.userService.update(existUser.id, {
      password: encryptedPass,
    });

    return updatedUser;
  }

  async logout() {}
}
