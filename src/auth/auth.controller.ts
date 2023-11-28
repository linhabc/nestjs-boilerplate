import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { Response } from 'express';
import JwtAuthGuard from './strategy/jwt-auth.guard';
import LocalAuthGuard from './strategy/local.strategy';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  async signUp(@Body() body: Prisma.UserCreateInput, @Res() res: Response) {
    const createdUser = await this.authService.signUp(body).catch((e) => {
      return {
        error: true,
        message: e,
      };
    });

    if ('error' in createdUser)
      res.status(400).json({
        success: false,
      });

    res.status(200).json({
      success: true,
      user: createdUser,
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('logout')
  async logout() {}

  @Post('changePassword')
  async changePassword() {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
