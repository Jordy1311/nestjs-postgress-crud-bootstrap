import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { Importance } from './entities/importance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Importance])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule { }
