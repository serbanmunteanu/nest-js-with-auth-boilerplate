import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignUpPipe } from 'src/api/auth/pipes/signup.pipe';
import { CreateUserDto } from '../../common/user/dtos/create-user.dto';
import { UserDto } from '../../common/user/dtos/user.dto';
import { AuthFacade } from './auth.facade';
import { PreLoginDto } from './dtos/pre-login.dto';
import { LoginInPipe } from './pipes/login.pipe';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(protected authFacade: AuthFacade) {}

  @Post('/signup')
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ type: UserDto })
  @ApiOperation({
    operationId: 'sign-up-user',
    summary: 'Sign up a new user',
    description: 'Create a new user and return info + token',
  })
  public async signUp(@Body(SignUpPipe) dto: CreateUserDto): Promise<UserDto> {
    return await this.authFacade.create(dto);
  }

  @Post('/login')
  @ApiBody({ type: PreLoginDto })
  @ApiResponse({ type: UserDto })
  @ApiOperation({
    operationId: 'log-in-user',
    summary: 'Log in the user',
    description: 'Log in the user and return info + token',
  })
  public async logIn(@Body(LoginInPipe) dto: PreLoginDto): Promise<UserDto> {
    return await this.authFacade.login(dto);
  }
}
