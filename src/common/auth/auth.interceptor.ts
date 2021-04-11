import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(
    @Inject(AuthService) protected authService: AuthService,
    @Inject(Reflector) protected reflector: Reflector,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const permission = this.reflector.get<string>(
      'permission',
      context.getHandler(),
    );
    if (!permission) {
      return next.handle();
    }
    const request = context.switchToHttp().getRequest();
    try {
      const user = await this.authService.validateUserToken(
        request.headers.authorization,
      );
      if (permission !== user.permissions.id) {
        throw new UnauthorizedException('Permission failed');
      }
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }

    return next.handle();
  }
}
