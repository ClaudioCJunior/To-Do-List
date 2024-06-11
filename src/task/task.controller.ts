import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: any){
    //TODO: Adiciona validações para não duplicar atividades
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll(@Body() body: any) {
    return this.taskService.findAllByUserId(body.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Body() body: any) {
    return this.taskService.findOneByIdAndUserId(id, body.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.updateByIdAndUserId(id, updateTaskDto.userId, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() body: any) {
    return this.taskService.removeByIdAndUserId(id, body.userId);
  }
}
