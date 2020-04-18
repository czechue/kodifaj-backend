import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './interfaces/task.interface';
import { User } from '../user/interfaces/user.interface';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<Task>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskModel
      .find()
      .populate('_user', 'login photo')
      .exec();
  }
}
