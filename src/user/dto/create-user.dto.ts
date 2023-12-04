import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Prisma, Role } from '@prisma/client';
import { IsEmail, IsEnum, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsEmail()
  email: string;

  @IsStrongPassword(
    {},
    {
      message:
        'password must be minumum 8 char, contains number, 1 symbol, a lowercase and uppercase leter',
    },
  )
  password: string;

  @IsString()
  name?: string;

  @IsEnum($Enums.Role)
  @ApiProperty({ default: [Role.USER] })
  roles?: $Enums.Role[] | Prisma.UserCreaterolesInput;
}
