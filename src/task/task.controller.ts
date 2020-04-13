import { Controller, Get } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './interfaces/task.interface';

@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('')
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }
}
