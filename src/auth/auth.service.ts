import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(payload: any): Promise<any> {
    return await this.usersService.findOne(payload.id);
  }
}
