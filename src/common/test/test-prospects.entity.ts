import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TestCategories } from './test-category.entity';
import { Submissions } from './test-submissions.entity';

@Entity('prospects')
export class Prospects {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  grade: number;

  @ManyToOne(() => TestCategories, (testCategories) => testCategories.prospects)
  category: TestCategories;

  @OneToMany(() => Submissions, (submissions) => submissions.prospect)
  submissions: Submissions;
}
