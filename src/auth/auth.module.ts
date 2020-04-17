import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { GithubStrategy } from './github.strategy';
import { AuthController } from './auth.controller';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'session',
    }),
  ],
  providers: [AuthService, GithubStrategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
