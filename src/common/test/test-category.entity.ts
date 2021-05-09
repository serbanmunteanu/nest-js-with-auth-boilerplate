import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Prospects } from './test-prospects.entity';
import { Question } from './test-question.entity';

@Entity('test_categories')
export class TestCategories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Question, (question) => question.category)
  questions: Question[];

  @OneToMany(() => Prospects, (prospects) => prospects.category)
  prospects: Prospects[];
}
