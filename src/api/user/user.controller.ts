import {
  Controller,
  Get,
  Req,
  SetMetadata,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/common/auth/auth.interceptor';
import { PUBLIC_PERMISSION } from 'src/common/constants';
import { GetUserDto } from './dto/get-user.dto';
import { UserFacade } from './user.facade';

@ApiTags('Users')
@Controller('api')
export class UserController {
  constructor(private userFacade: UserFacade) {}

  @Get('/user')
  @UseInterceptors(AuthInterceptor)
  @SetMetadata('permission', PUBLIC_PERMISSION)
  async getUser(@Req() request): Promise<GetUserDto> {
    const user = await this.userFacade.getUserInformation(request.user.id);
    return new GetUserDto(user);
  }
}
