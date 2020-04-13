import { User } from '../../user/interfaces/user.interface';
import { Document } from 'mongoose';

export interface Solution extends Document {
  comment: string;
  createdAt: string;
  demo: string;
  phase: 'review' | 'done';
  repo: string;
  _id: string;
  _task: string;
  _user: User;
}
