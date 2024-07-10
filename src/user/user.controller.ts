import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/common/decorator';
import { UserService } from './user.service';

@Roles([Role.ADMIN])
@UseGuards(RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll({});
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.delete(id);
  }
}
