import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CategorizationService } from 'src/categorization/categorization.service';
import { ListTaskDto } from './dto/list-task.dto';


@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private categorizationService: CategorizationService
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const categorizations = await this.categorizationService.findAllByIds(createTaskDto.listCategorization);

    createTaskDto.categorizations = categorizations;

    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
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

  async findAllByUserIdWithSort(userId: number, listTaskDto: ListTaskDto): Promise<Task[]> {
    const queryBuilder = this.taskRepository.createQueryBuilder('task');
    queryBuilder.leftJoinAndSelect('task.categorizations', 'categorizations');
    queryBuilder.where('task.user = :userId', { userId });

    if (listTaskDto.filter) {
      queryBuilder.andWhere('task.' + listTaskDto.filter.field + ' = :value', { value: listTaskDto.filter.value });
    }

    if (listTaskDto.sort) {
      queryBuilder.orderBy('task.' + listTaskDto.sort.field, listTaskDto.sort.direction == 'ASC' ? 'ASC' : 'DESC');
    }

    return queryBuilder.getMany();
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

  async updateStatusByIdAndUserId(id: number, userId: number, completionStatus: boolean): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, user: { id: userId } } });
    if (!task) {
      throw new Error('Task not found');
    }
    console.log(completionStatus);

    task.completionStatus = completionStatus;
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

  async findAllByCategorizationAndUser( categorizationId: number, userId: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { categorizations: { id: categorizationId }, user: { id: userId } } });
  }
}
