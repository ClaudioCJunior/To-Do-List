import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';


@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const user = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(user);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new Error('User not found');
    }
    this.taskRepository.merge(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  findOne(id: number): Promise<Task> {
    return this.taskRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.taskRepository.delete(id);
  }

  async findAllByUserId(userId: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { user: { id: userId} } });
  }

  async updateByIdAndUserId(
    id: number,
    userId: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, user: { id: userId } } });
    if (!task) {
      throw new Error('Task not found');
    }
    this.taskRepository.merge(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  async findOneByIdAndUserId(id: number, userId: number): Promise<Task> {
    return await this.taskRepository.findOne({ where: { id, user: { id: userId } } });
  }

  async removeByIdAndUserId(id: number, userId: number): Promise<DeleteResult> {
    const task = await this.taskRepository.findOne({ where: { id, user: { id: userId } } });
    if (!task) {
      throw new Error('Task not found');
    }
    return await this.taskRepository.delete(id);
  }

  // async findOneByDateDueAndUserId(
  //   dueDate: Date,
  //   userId: number,
  // ): Promise<Task> {
  //   return await this.taskRepository.findOne({ where: { dueDate, user: userId } });
  // }
}
