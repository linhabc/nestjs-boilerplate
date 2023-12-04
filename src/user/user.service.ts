import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return await this.prisma.user.create({ data });
  }

  async findAll(filter: Prisma.UserFindManyArgs) {
    return await this.prisma.user.findMany(filter);
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async update(id: number, data: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
