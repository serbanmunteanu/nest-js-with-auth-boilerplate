import { Answers } from 'src/common/test/test-answer.entity';
import { TestCategories } from 'src/common/test/test-category.entity';
import { Question } from 'src/common/test/test-question.entity';

export class GetTestDto {
  question: string;
  category: TestCategories;
  answers: Answers;

  constructor(quest: Question) {
    this.question = quest.question;
    this.category = quest.category;
    this.answers = quest.answers;
  }
}
