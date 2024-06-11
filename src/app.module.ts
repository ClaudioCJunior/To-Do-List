import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost/todolist'),//TODO adicionar em variável de ambiente
    TaskModule, 
  ],
  controllers: [AppController],
  providers: [],
  exports: [],  
})
export class AppModule {}
