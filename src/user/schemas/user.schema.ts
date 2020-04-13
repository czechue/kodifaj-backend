import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  googleId: String,
  githubId: String,
  login: String,
  photo: String,
  _solutions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Solution' }],
  _tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
});
