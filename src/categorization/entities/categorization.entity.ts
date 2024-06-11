import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { Task } from 'src/task/entities/task.entity';


@Entity()
export class Categorization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Task, task => task.categorizations)
  tasks: Task[];
}
