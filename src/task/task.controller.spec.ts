import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from './interfaces/task.interface';
import { getModelToken } from '@nestjs/mongoose';

describe('TaskController', () => {
  let app: TestingModule;
  let taskModel = {};
  let userModel = {};

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        TaskService,
        {
          provide: getModelToken('Task'),
          useValue: taskModel,
        },
        {
          provide: getModelToken('User'),
          useValue: userModel,
        },
      ],
    }).compile();
  });

  describe('task', () => {
    it('should return first project', async () => {
      const taskController = app.get<TaskController>(TaskController);
      const taskService = app.get<TaskService>(TaskService);
      jest
        .spyOn(taskService, 'findAll')
        .mockResolvedValue([{ _id: '1' }, { _id: '2' }] as Task[]);

      const res = await taskController.findAll();
      expect(res[0]).toEqual({ _id: '1' });
    });
  });
});
