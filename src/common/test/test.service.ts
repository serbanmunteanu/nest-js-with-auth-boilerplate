import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestCategories } from './test-category.entity';
import { Cache } from '../cache/cache.decorator';
import { Prospects } from './test-prospects.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(TestCategories)
    private testCategoriesRepo: Repository<TestCategories>,
    @InjectRepository(Prospects)
    private prospectsRepo: Repository<Prospects>,
  ) {}

  @Cache({ key: 'test-questions', ttl: 60 * 24 })
  async getAllQuestionsForCategory(): Promise<TestCategories[]> {
    return await this.testCategoriesRepo.find({
      relations: ['questions', 'questions.answers'],
    });
  }

  async getResultForProspect(id: number) {
    return await this.prospectsRepo.find({
      relations: [
        'category',
        'submissions',
        'submissions.question',
        'submissions.answer',
      ],
      where: { id },
    });
  }
}
