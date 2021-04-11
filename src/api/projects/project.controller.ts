import {
  Controller,
  Get,
  Req,
  Res,
  SetMetadata,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/common/auth/auth.interceptor';
import { PUBLIC_PERMISSION } from 'src/common/constants';
import { ProjectFacade } from './project.facade';

@ApiTags('Projects')
@Controller('api')
export class ProjectController {
  constructor(private projectFacade: ProjectFacade) {}

  @Get('/projects')
  @UseInterceptors(AuthInterceptor)
  @SetMetadata('permission', PUBLIC_PERMISSION)
  async getProjects(@Req() request, @Res() response): Promise<void> {
    const projects = await this.projectFacade.getProjectForUser(
      request.user.id,
    );
    response.json(projects);
  }
}
