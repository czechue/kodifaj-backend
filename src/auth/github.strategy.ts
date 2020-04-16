import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import keys from '../../config/keys';
import { UsersService } from '../users/users.service';
import { User } from '../users/interfaces/user.interface';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly usersService: UsersService) {
    super({
      clientID: keys.githubClientID,
      clientSecret: keys.githubClientSecret,
      callbackURL: '/auth/github/callback',
      scope: `profile email`,
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
  ): Promise<User | undefined> {
    const existingUser = await this.usersService.findOne({
      githubId: profile.id,
    });

    if (existingUser) {
      return existingUser;
    }

    try {
      return await this.usersService.create(profile);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
