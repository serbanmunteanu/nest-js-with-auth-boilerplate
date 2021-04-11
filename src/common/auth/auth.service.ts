import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(protected jwtService: JwtService) {}

  public async createUserToken(user: User): Promise<string> {
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastNamee: user.lastName,
      isActive: user.isActive,
      email: user.email,
      permissions: user.permissions,
    };
    return await this.jwtService.signAsync(payload);
  }

  public async validateUserToken(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(token);
  }
}
