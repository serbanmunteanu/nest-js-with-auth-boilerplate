import { Module } from '@nestjs/common';
import { AuthModule } from 'src/common/auth/auth.module';
import { ProjectModule as CommonProjectModule } from '../../common/project/project.module';
import { ProjectController } from './project.controller';
import { ProjectFacade } from './project.facade';

@Module({
  imports: [CommonProjectModule, AuthModule],
  providers: [ProjectFacade],
  controllers: [ProjectController],
})
export class ProjectModule {}
