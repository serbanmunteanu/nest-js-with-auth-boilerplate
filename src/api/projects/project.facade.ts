import { Injectable } from '@nestjs/common';
import { Project } from 'src/common/project/project.entity';
import { ProjectService } from 'src/common/project/project.service';

@Injectable()
export class ProjectFacade {
  constructor(private projectService: ProjectService) {}

  async getProjectForUser(userId: string): Promise<Project[]> {
    return await this.projectService.getProjectForUser(userId);
  }
}
