import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { OrderModule } from './order/order.module';
import JwtAuthGuard from './auth/guard/jwt-auth.guard';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, OrderModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
