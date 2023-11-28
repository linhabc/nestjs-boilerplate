import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private user: UserService,
    private jwtService: JwtService,
  ) {}
  bcryptSaltRounds = 10;

  async signUp(data: Prisma.UserCreateInput) {
    const { password } = data;
    const encryptedPass = await bcrypt.hash(password, this.bcryptSaltRounds);
    return await this.user.create({ ...data, password: encryptedPass });
  }

  async login(user: User) {
    return {
      jwt: await this.jwtService.signAsync({
        sub: user.id,
        name: user.name,
      }),
    };
  }

  async validateUser(email: string, password: string) {
    const foundUser = await this.user.findOneByEmail(email);

    const comparedPass = await bcrypt.compare(password, foundUser.password);
    if (comparedPass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = foundUser;
      return result;
    }

    return null;
  }

  async logout() {}

  async changePassword() {}
}
