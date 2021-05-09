import { Injectable } from '@nestjs/common';
import { TestCategories } from 'src/common/test/test-category.entity';
import { TestService } from 'src/common/test/test.service';

@Injectable()
export class TestFacade {
  constructor(private testService: TestService) {}

  async getTests(): Promise<TestCategories[]> {
    return await this.testService.getAllQuestionsForCategory();
  }

  async getResult() {
    return await this.testService.getResultForProspect(1);
  }
}
