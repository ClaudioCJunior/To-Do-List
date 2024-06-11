import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorizationModule } from './categorization/categorization.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({ //TODO Adicionar no .env
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'todolist',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TaskModule,
    CategorizationModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
