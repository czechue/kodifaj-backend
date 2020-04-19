import { Controller, Get, Param, Req } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './interfaces/user.interface';

interface ReqWithUser extends Request{
  user: any;
}

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  getCurrentUser(@Req() req: ReqWithUser): Promise<User | null> {
    return req.user;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOneWithDetails({ _id: id });
  }
}
