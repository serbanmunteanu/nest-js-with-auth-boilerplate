import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answers } from './test-answer.entity';
import { TestCategories } from './test-category.entity';
import { Prospects } from './test-prospects.entity';
import { Question } from './test-question.entity';
import { Submissions } from './test-submissions.entity';
import { TestService } from './test.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Question,
      Answers,
      TestCategories,
      Prospects,
      Submissions,
    ]),
  ],
  providers: [TestService],
  exports: [TestService],
})
export class TestModule {}
