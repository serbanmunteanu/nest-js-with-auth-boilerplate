import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache } from '../cache/cache.decorator';
import { Permissions } from './permissions.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permissions) private repository: Repository<Permissions>,
  ) {}

  async getPermissionsByType(type: string): Promise<Permissions> {
    return await this.repository.findOne({ type });
  }

  @Cache({ key: 'permissions', ttl: 60 * 5 })
  async getPermissions(): Promise<Permissions[]> {
    return await this.repository.find();
  }
}
