import { DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// using MongoMemoryServer to not connect with DB in tests
// https://github.com/nestjs/mongoose/issues/13#issuecomment-525909718

export default function testDataBase(mongod): DynamicModule {
  return MongooseModule.forRootAsync({
    useFactory: async () => {
      const uri = await mongod.getUri();
      return {
        uri: uri,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      };
    },
  })
}