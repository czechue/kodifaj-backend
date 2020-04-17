import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { User } from '../user/interfaces/user.interface';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly usersService: UsersService) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
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
