import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) { }

  create(newTask: CreateTaskDto) {
    const createdTask = this.taskRepository.create(newTask);
    return this.taskRepository.save(createdTask);
  }

  findAll() {
    return this.taskRepository.find();
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne(id);

    if (!task) {
      throw new NotFoundException(`Task ${id} was not found!`);
    }
    return task;
  }

  async update(id: number, update: UpdateTaskDto) {
    const updatedTask = await this.taskRepository.preload({
      id,
      ...update,
    });

    if (!updatedTask) {
      throw new NotFoundException(`Task ${id} was not found!`);
    }

    return this.taskRepository.save(updatedTask);
  }

  async remove(id: number) {
    const taskToDelete = await this.findOne(id);
    return this.taskRepository.remove(taskToDelete);
  }
}
