import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { User } from '../user.entity';

export class UserDto {
  @ApiProperty()
  @IsOptional()
  id?: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  token: string;

  @ApiProperty()
  permissions: string;

  constructor(user: User, token: string) {
    (this.id = user.id),
      (this.firstName = user.firstName),
      (this.lastName = user.lastName),
      (this.email = user.email),
      (this.isActive = user.isActive),
      (this.token = token);
    this.permissions = user.permissions.id;
  }
}
