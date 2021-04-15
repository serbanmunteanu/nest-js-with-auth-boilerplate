import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionsService } from '../permissions/permissions.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private permissionsService: PermissionsService,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email: email },
      relations: ['permissions'],
    });
  }

  async findUserById(userId: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: ['permissions', 'projects'],
    });
  }

  async create(user: CreateUserDto): Promise<User> {
    user.permissions = await this.permissionsService.getPermissionsByType(
      'public',
    );
    return await this.userRepository.save(user);
  }
}
