import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(
    user: any,
    done: (err: Error | null, user: number) => void,
  ): void {
    done(null, user.id);
  }

  deserializeUser(
    id: any,
    done: (err: Error | null, payload?: any) => void,
  ): void {
    this.usersService
      .findOne({ _id: id })
      .then(user => done(null, user))
      .catch(error => done(error));
  }
}
