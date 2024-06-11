import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Priority } from '../enums/priority.enum';
import { User } from 'src/users/entities/user.entity';
import { Categorization } from '../../categorization/entities/categorization.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @Column({ type: Number, enum: Priority, default: Priority.Low })
  priority: number;

  @Column({ type: Date })
  dueDate: Date;

  @Column({ type: Boolean, default: false })
  completionStatus: boolean;

  @Column({ type: Number, default: 1 })
  evaluationPoints: number;

  @ManyToMany(() => Categorization, categorization => categorization.tasks, { cascade: true, eager: true })
  @JoinTable()
  categorizations: Categorization[];
}
