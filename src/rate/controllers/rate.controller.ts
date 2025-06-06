import { Controller, Get } from '@nestjs/common';
import { RateService } from '../services/rate.service';

@Controller('rate')
export class RateController {
  constructor(private readonly service: RateService) {}

  @Get('getRate')
  getRate() {
    return this.service.getRate();
  }

  @Get('getStdRate')
  getStdRate() {
    return this.service.getStdRate();
  }
}
