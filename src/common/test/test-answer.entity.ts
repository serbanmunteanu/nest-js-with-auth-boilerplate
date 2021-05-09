import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './test-question.entity';

@Entity('answers')
export class Answers {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  data: string;

  @Column({ select: false })
  isTrue: boolean;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;
}
