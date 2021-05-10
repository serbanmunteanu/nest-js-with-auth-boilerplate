import { Injectable } from '@nestjs/common';
import { TestCategories } from 'src/common/test/test-category.entity';
import { Prospects } from 'src/common/test/test-prospects.entity';
import { TestService } from 'src/common/test/test.service';
import { CreateSubmissionDto } from './dto/create-submissions.dto';

@Injectable()
export class TestFacade {
  constructor(private testService: TestService) {}

  async getTests(): Promise<TestCategories[]> {
    return await this.testService.getAllQuestionsForCategory();
  }

  async getResult(dto: CreateSubmissionDto): Promise<Prospects> {
    return await this.testService.storeSubmission(dto);
  }
}
