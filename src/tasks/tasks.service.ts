import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      task: 'Get milk',
      importance: 'medium',
    },
    {
      id: 2,
      task: 'Water plants',
      importance: 'high',
    },
  ];

  create(task: CreateTaskDto) {
    const id = this.tasks.length + 1;
    const newTask: Task = {
      id,
      ...task,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    const task = this.tasks.find(task => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task ${id} was not found!`);
    }
    return task;
  }

  async update(id: number, update: UpdateTaskDto) {
    const existingTask = await this.findOne(id);

    if (!existingTask) {
      throw new NotFoundException(`Task ${id} was not found!`);
    }

    const updatedTask = {
      ...existingTask,
      ...update,
    }

    await this.remove(id);

    return this.create(updatedTask);
  }

  remove(id: number) {
    // .findIndex returns -1 when nothing found
    const taskIndex = this.tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      throw new NotFoundException(`Task ${id} was not found!`);
    }

    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1);
    }
  }
}
