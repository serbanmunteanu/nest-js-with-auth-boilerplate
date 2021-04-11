import { Module } from '@nestjs/common';
import { UserModule } from 'src/common/user/user.module';
import { AuthController } from './auth.controller';
import { AuthFacade } from './auth.facade';
import { AuthModule as CommonAuthModule } from '../../common/auth/auth.module';

@Module({
  imports: [UserModule, CommonAuthModule],
  providers: [AuthFacade],
  controllers: [AuthController],
})
export class AuthModule {}
