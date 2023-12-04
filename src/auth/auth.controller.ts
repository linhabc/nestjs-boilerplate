import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Public } from 'src/decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import LocalAuthGuard from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signUp')
  async signUp(@Body() body: CreateUserDto) {
    const createdUser = await this.authService.signUp(body).catch((e) => {
      return {
        error: true,
        message: e,
      };
    });
    console.log(createdUser);

    if ('error' in createdUser)
      throw new HttpException(createdUser.message, HttpStatus.BAD_REQUEST);

    return {
      success: true,
      user: createdUser,
    };
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('logout')
  async logout() {}

  @Post('changePassword')
  async changePassword() {}

  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
