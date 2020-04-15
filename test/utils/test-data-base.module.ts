import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

// using MongoMemoryServer to not connect with DB in tests
// https://github.com/nestjs/mongoose/issues/13#issuecomment-525909718

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mongod = new MongoMemoryServer();
        const uri = await mongod.getUri();
        return {
          uri: uri,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        }
      },
      inject: [ConfigService],
    }),
  ],
})
export class TestDatabaseModule {}