import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Answers } from './test-answer.entity';
import { TestCategories } from './test-category.entity';

@Entity('question')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @ManyToOne(() => TestCategories, (testCategories) => testCategories.questions)
  category: TestCategories;

  @OneToMany(() => Answers, (answers) => answers.question)
  answers: Answers;
}
