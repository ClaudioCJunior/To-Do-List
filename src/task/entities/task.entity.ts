import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Priority } from '../enums/priority.enum';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.tasks, { eager: true })
  user: User;

  @Column({ type: Number, enum: Priority, default: Priority.Low })
  priority: number;

  @Column({ type: Date })
  dueDate: Date;

  @Column({ type: Boolean, default: false })
  completionStatus: boolean;

  @Column({ type: Number, default: 1 })
  evaluationPoints: number;
}
