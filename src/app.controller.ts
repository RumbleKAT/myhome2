import { Controller, Get } from '@nestjs/common';
import { AppService } from './services/greeting.service';
import { Custom } from './decorators/custom.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Custom({ message: 'GET /', enableLog: true })
  getHello(): string {
    return this.appService.getGreeting();
  }

  @Get('home')
  getHome(): string {
    return "This is the home page!";
  }
}
