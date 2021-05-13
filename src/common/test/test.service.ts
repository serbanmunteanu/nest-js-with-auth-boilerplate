import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { TestCategories } from './test-category.entity';
import { Cache, InvalidateCache } from '../cache/cache.decorator';
import { Prospects } from './test-prospects.entity';
import { CreateSubmissionDto } from 'src/api/test/dto/create-submissions.dto';
import { Submissions } from './test-submissions.entity';
import { Answers } from './test-answer.entity';
import { CreateTestDto } from 'src/api/test/dto/create-test.dto';
import { Question } from './test-question.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(TestCategories)
    private testCategoriesRepo: Repository<TestCategories>,
    @InjectRepository(Prospects)
    private prospectsRepo: Repository<Prospects>,
    @InjectRepository(Submissions)
    private submissionsRepo: Repository<Submissions>,
    @InjectRepository(Answers)
    private answersRepo: Repository<Answers>,
    @InjectRepository(Question)
    private questionRepo: Repository<Question>,
  ) {}

  @Cache({ key: 'test-questions', ttl: 60 * 24 })
  async getAllQuestionsForCategory(): Promise<TestCategories[]> {
    return await this.testCategoriesRepo.find({
      relations: ['questions', 'questions.answers'],
    });
  }

  async getResultForProspect(id: number): Promise<Prospects> {
    return await this.prospectsRepo.findOne({
      relations: [
        'category',
        'submissions',
        'submissions.question',
        'submissions.answer',
      ],
      where: { id },
    });
  }

  async storeSubmission(dto: CreateSubmissionDto): Promise<Prospects> {
    let prospect = await this.prospectsRepo.create();
    const testCategory = await this.testCategoriesRepo.findOne({
      where: { name: dto.category },
    });

    prospect.category = testCategory;
    prospect.grade = 0;
    prospect.email = dto.email;
    prospect = await this.prospectsRepo.save(prospect);

    await this.submissionsRepo
      .createQueryBuilder()
      .insert()
      .into(Submissions)
      .values(
        dto.submissions.map((submission) => {
          return {
            prospect: prospect,
            question: submission.questionId,
            answer: submission.answerId,
          };
        }),
      )
      .execute();

    const rightAnswers = await this.answersRepo.find({
      where: {
        id: In(dto.submissions.map((submission) => submission.answerId)),
        isTrue: true,
      },
    });

    prospect.grade = rightAnswers.length;
    await this.prospectsRepo.save(prospect);

    return prospect;
  }

  @InvalidateCache({ key: 'test-questions' })
  async storeTest(dto: CreateTestDto): Promise<Question> {
    let test = await this.questionRepo.create();
    test.question = dto.question;
    const testCategory = await this.testCategoriesRepo.findOne({
      where: { id: dto.categoryId },
    });
    test.category = testCategory;
    test = await this.questionRepo.save(test);

    this.answersRepo
      .createQueryBuilder()
      .insert()
      .into(Answers)
      .values(
        dto.answers.map((item) => {
          return {
            data: item.data,
            isTrue: item.isTrue,
            question: test,
          };
        }),
      )
      .execute();

    return await this.questionRepo.findOne({
      relations: ['category', 'answers'],
      where: { id: test.id },
    });
  }
}
