import { Injectable } from '@nestjs/common';
import { UserService } from 'src/common/user/user.service';

@Injectable()
export class UserFacade {
  constructor(private userService: UserService) {}

  async getUserInformation(userId: string): Promise<any> {
    return await this.userService.findUserById(userId);
  }
}
