import { Injectable } from '@nestjs/common';
import { TestCategories } from 'src/common/test/test-category.entity';
import { Prospects } from 'src/common/test/test-prospects.entity';
import { Question } from 'src/common/test/test-question.entity';
import { TestService } from 'src/common/test/test.service';
import { CreateSubmissionDto } from './dto/create-submissions.dto';
import { CreateTestDto } from './dto/create-test.dto';

@Injectable()
export class TestFacade {
  constructor(private testService: TestService) {}

  async getTests(): Promise<TestCategories[]> {
    return await this.testService.getAllQuestionsForCategory();
  }

  async getResult(dto: CreateSubmissionDto): Promise<Prospects> {
    return await this.testService.storeSubmission(dto);
  }

  async createTest(dto: CreateTestDto): Promise<Question> {
    return await this.testService.storeTest(dto);
  }
}
