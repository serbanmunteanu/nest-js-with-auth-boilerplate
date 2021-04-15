import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Permissions } from 'src/common/permissions/permissions.entity';
import { Project } from 'src/common/project/project.entity';
import { User } from 'src/common/user/user.entity';

export class GetUserDto {
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
  permissions: Permissions;

  @ApiProperty()
  projects: Project[];

  constructor(user: User) {
    (this.id = user.id),
      (this.firstName = user.firstName),
      (this.lastName = user.lastName),
      (this.email = user.email),
      (this.isActive = user.isActive),
      (this.permissions = user.permissions);
    this.projects = user.projects;
  }
}
