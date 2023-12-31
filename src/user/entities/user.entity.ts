import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Role, User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  email: string;
  password: string;
  name: string;
  @ApiProperty({ default: [Role.USER] })
  roles: $Enums.Role[];
}
