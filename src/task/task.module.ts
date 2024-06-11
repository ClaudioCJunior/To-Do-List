import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorizationService } from 'src/categorization/categorization.service';
import { CategorizationModule } from 'src/categorization/categorization.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    CategorizationModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
