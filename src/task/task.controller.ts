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

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Req() req: any) {
      createTaskDto.user = req.user;

      //TODO: Adiciona validações para não duplicar atividades
      return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.taskService.findAllByUserId(req.user.id);
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
  remove(@Param('id') id: number, @Req() req: any) {
    return this.taskService.removeByIdAndUserId(id, req.user.id);
  }

  @Get('categorization/:id')
  findBycategorization(@Param('id') id: number, @Req() req: any) {
    return this.taskService.findAllByCategorizationAndUser(id, req.user.id);
  }
  
}
