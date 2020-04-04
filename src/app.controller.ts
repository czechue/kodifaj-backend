import { Controller, Get } from '@nestjs/common';
import { AppService, Project } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Project[] {
    return this.appService.getHello();
  }
}
