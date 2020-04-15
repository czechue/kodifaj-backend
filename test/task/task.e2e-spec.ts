import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { TaskModule } from '../../src/task/task.module';
import { INestApplication } from '@nestjs/common';
import { TaskService } from '../../src/task/task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe.only('TaskController (e2e)', () => {
  let app: INestApplication;
  let taskService = { findAll: () => [{ _id: '1' }] };
  let mongod;

  beforeAll(async () => {
    mongod = new MongoMemoryServer();
    const moduleFixture = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            const uri = await mongod.getUri();
            return {
              uri: uri,
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useFindAndModify: false,
            };
          },
        }),
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
