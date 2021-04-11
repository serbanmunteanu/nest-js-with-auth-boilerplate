import {
  Injectable,
  NotFoundException,
  PipeTransform,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/common/user/user.service';
import { PreLoginDto } from '../dtos/pre-login.dto';
import { compare } from 'bcrypt';

@Injectable()
export class LoginInPipe implements PipeTransform {
  constructor(protected userService: UserService) {}

  async transform(value: PreLoginDto): Promise<PreLoginDto> {
    const user = await this.userService.findByEmail(value.email);

    if (!user) {
      throw new NotFoundException('Email not found');
    }

    const isPasswordMatching = await compare(value.password, user.password);

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Credentials not matching');
    }
    return value;
  }
}
