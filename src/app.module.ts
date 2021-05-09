import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './common/config/env.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './api/auth/auth.module';
import { ProjectModule } from './api/projects/project.module';
import { ContactModule } from './api/contact/contact.module';
import { UserModule } from './api/user/user.module';
import { TestModule } from './api/test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('mysql'),
    }),
    AuthModule,
    ProjectModule,
    ContactModule,
    UserModule,
    TestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
