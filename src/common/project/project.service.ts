import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private repository: Repository<Project>,
  ) {}

  async getProjectForUser(userId: string): Promise<Project[]> {
    return await this.repository.find({
      relations: ['user'],
      where: {
        user: { id: userId },
      },
    });
  }
}
