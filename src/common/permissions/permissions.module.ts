import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permissions } from './permissions.entity';
import { PermissionsService } from './permissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permissions])],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
