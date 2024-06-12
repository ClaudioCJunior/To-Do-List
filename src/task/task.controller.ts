import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CategorizationService } from 'src/categorization/categorization.service';
import { SortTaskDto } from './dto/sort-task.dto';
import { ListTaskDto } from './dto/list-task.dto';
import { Priority } from './enums/priority.enum';
import { Query } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Req() req: any) {
      createTaskDto.user = req.user;
      return this.taskService.create(createTaskDto);
  }

  @Get()
  async findAll(@Req() req: any, @Query() query: any) { 

    let listTaskDto: ListTaskDto = new ListTaskDto();
    if(query){
      listTaskDto = this.taskService.transformQueryParams(query);
    }

    const tasks = await this.taskService.findAllByUserIdWithSort(req.user.id, listTaskDto);

    const updatedTasks = tasks.map(task => {
      return {
        ...task,
        dateFormatted: new Date(task.dueDate.getTime() + 3 * 60 * 60 * 1000).toLocaleString('pt-BR'),
        priorityFormatted: Priority[task.priority],
      };
    });
    return updatedTasks;
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Req() req: any) {
    return this.taskService.findOneByIdAndUserId(id, req.user.id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Req() req: any, @Body() updateTaskDto: UpdateTaskDto) {
    updateTaskDto.user = req.user;

    return this.taskService.updateByIdAndUserId(
      id,
      updateTaskDto.user.id,
      updateTaskDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req: any) {
    const res : DeleteResult = await this.taskService.removeByIdAndUserId(id, req.user.id);

    if(res.affected < 0){
      throw new  Error('Error deleting task');
    }
  }

  @Patch(':id')
  updateStatus(@Param('id') id: number, @Req() req: any, @Body() body: any ) {
    return this.taskService.updateStatusByIdAndUserId(
      id,
      req.user.id,
      body.completionStatus,
    );
  }
  
}
