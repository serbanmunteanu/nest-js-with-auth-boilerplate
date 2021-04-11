import {
  Controller,
  Get,
  Res,
  SetMetadata,
  UseInterceptors,
} from '@nestjs/common';
import { AuthInterceptor } from 'src/common/auth/auth.interceptor';
import { AuthorizationInterceptor } from 'src/common/auth/authorization.interceptor';
import { ProjectFacade } from './project.facade';

@UseInterceptors(AuthorizationInterceptor)
@Controller()
export class ProjectController {
  constructor(private projectFacade: ProjectFacade) {}

  @Get('/projects')
  @UseInterceptors(AuthInterceptor)
  @SetMetadata('permission', 'bf4e9b86-9a11-111eb-85c7-8c8590749638')
  async getProjects(@Res() response): Promise<void> {
    const projects = await this.projectFacade.getProjectForUser(
      '0fa9510f-0fd1-4461-926b-a81e5040781b',
    );
    response.json(projects);
  }
}
