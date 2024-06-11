import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from 'src/task/entities/task.entity';
import { OneToMany } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Task, task => task.user,   { cascade: true})
  tasks: Task[];

  @BeforeInsert()
  async beforeInsertActions() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeUpdate()
  async beforeUpdateActions() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
