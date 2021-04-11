import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Permissions } from 'src/common/permissions/permissions.entity';
import { Project } from '../project/project.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  password: string;

  @ManyToOne(() => Permissions, (permissions) => permissions.user)
  permissions: Permissions;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];
}
