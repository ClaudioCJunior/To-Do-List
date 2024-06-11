import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './entities/task.entity';
import { AppService } from 'src/app.service';

@Injectable()
export class TaskService extends AppService<Task>{
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {
    super(taskModel);
  }

  async findAllByUserId(userId: string): Promise<Task[]> {
    return this.taskModel.find({ userId }).exec();
  }
  async updateByIdAndUserId(id: string, userId: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskModel.findOneAndUpdate({ _id: id, userId }, updateTaskDto, { new: true }).exec();
  }

  async findOneByIdAndUserId(id: string, userId: string): Promise<Task> {
    return this.taskModel.findOne({ _id: id, userId }).exec();
  }

  async removeByIdAndUserId(id: string, userId: string): Promise<Task> {
    return this.taskModel.findOneAndDelete({ _id: id, userId }).exec();
  }

  async findOneByDateDueAndUserId(dateDue: Date, userId: string): Promise<Task> {
    return this.taskModel.findOne({ dateDue, userId }).exec();
  }

}
