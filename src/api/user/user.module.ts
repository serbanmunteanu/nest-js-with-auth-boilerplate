import { Module } from '@nestjs/common';
import { AuthModule } from 'src/common/auth/auth.module';
import { UserModule as CommonUserModule } from '../../common/user/user.module';
import { UserController } from './user.controller';
import { UserFacade } from './user.facade';

@Module({
  controllers: [UserController],
  imports: [CommonUserModule, AuthModule],
  providers: [UserFacade],
})
export class UserModule {}
