import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { TaskModule } from '../../src/task/task.module';
import { INestApplication } from '@nestjs/common';
import { TaskService } from '../../src/task/task.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import testDataBase from '../utils/test-data-base.module';

describe('TaskController (e2e)', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;
  let taskService = { findAll: () => [{ _id: '1' }] };

  beforeAll(async () => {
    mongod = new MongoMemoryServer();
    const moduleFixture = await Test.createTestingModule({
      imports: [
        testDataBase(mongod),
        TaskModule,
      ],
    })
      .overrideProvider(TaskService)
      .useValue(taskService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/tasks (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/tasks')
      .expect(200)
      .expect([{ _id: '1' }]);
  });

  afterAll(async () => {
    await app.close();
    await mongod.stop();
  });
});
