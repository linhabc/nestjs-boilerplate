import { ApiProperty } from '@nestjs/swagger';

class Jwtdecode {
  @ApiProperty()
  sub: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  roles: string;
}

class JwtDecodeEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  roles: string;
}

export { Jwtdecode, JwtDecodeEntity };
