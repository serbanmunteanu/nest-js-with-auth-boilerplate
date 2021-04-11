import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'asdsada',
      signOptions: {
        expiresIn: '4h',
      },
    }),
  ],
  providers: [AuthService, AuthInterceptor],
  exports: [AuthService, AuthInterceptor, JwtModule],
})
export class AuthModule {}
