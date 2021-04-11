import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/common/auth/auth.service';
import { CreateUserDto } from 'src/common/user/dtos/create-user.dto';
import { UserDto } from 'src/common/user/dtos/user.dto';
import { UserService } from 'src/common/user/user.service';
import { PreLoginDto } from './dtos/pre-login.dto';

@Injectable()
export class AuthFacade {
  constructor(
    protected userService: UserService,
    protected authService: AuthService,
  ) {}

  async create(user: CreateUserDto): Promise<UserDto> {
    const newUser = await this.userService.create(user);
    const token = await this.authService.createUserToken(newUser);
    return new UserDto(newUser, token);
  }

  async login(user: PreLoginDto): Promise<UserDto> {
    const authUser = await this.userService.findByEmail(user.email);
    const token = await this.authService.createUserToken(authUser);
    return new UserDto(authUser, token);
  }
}
