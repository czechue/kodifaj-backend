import { Document } from 'mongoose';

export interface User extends Document {
  _id: string;
  login: string;
  googleId?: string;
  githubId?: string;
  photo?: string;
}
