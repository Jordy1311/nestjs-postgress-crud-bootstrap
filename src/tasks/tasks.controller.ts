import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tasksService.findOne(id);
  }

  @Post()
  create(@Body() coffee: CreateTaskDto) {
    return this.tasksService.create(coffee);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() task: UpdateTaskDto) {
    return this.tasksService.update(id, task);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tasksService.remove(id);
  }
}
