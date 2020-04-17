import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './interfaces/user.interface';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOneWithDetails({ _id: id });
  }
}
