import { Module } from '@nestjs/common';
import { TestModule as CommonTestModule } from '../../common/test/test.module';
import { TestController } from './test.controller';
import { TestFacade } from './test.facade';
@Module({
  imports: [CommonTestModule],
  providers: [TestFacade],
  controllers: [TestController],
})
export class TestModule {}
