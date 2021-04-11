import {
  Injectable,
  PipeTransform,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../../../common/user/dtos/create-user.dto';
import { UserService } from '../../../common/user/user.service';
import { hash } from 'bcrypt';

@Injectable()
export class SignUpPipe implements PipeTransform {
  constructor(protected userService: UserService) {}

  async transform(value: CreateUserDto): Promise<CreateUserDto> {
    const user = await this.userService.findByEmail(value.email);

    if (user) {
      throw new UnauthorizedException('Email already used');
    }

    const hashedPassword = await hash(value.password, 10);
    return { ...value, password: hashedPassword };
  }
}
