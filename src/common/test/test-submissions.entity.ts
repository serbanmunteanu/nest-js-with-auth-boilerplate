import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Answers } from './test-answer.entity';
import { Prospects } from './test-prospects.entity';
import { Question } from './test-question.entity';

@Entity('submissions')
export class Submissions {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Prospects, (prospects) => prospects.submissions)
  prospect: Prospects;

  @ManyToOne(() => Question, (question) => question.id)
  question: number;

  @ManyToOne(() => Answers, (answers) => answers.id)
  answer: number;
}
