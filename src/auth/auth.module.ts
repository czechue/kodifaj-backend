import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { GithubStrategy } from './github.strategy';
import { AuthController } from './auth.controller';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'session',
    }),
  ],
  providers: [AuthService, GithubStrategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
