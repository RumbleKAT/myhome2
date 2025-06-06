import { Controller, Get, Query } from '@nestjs/common';
import { NewsService } from '../services/news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly service: NewsService) {}

  @Get('getNews')
  getNews(@Query('keyword') keyword?: string) {
    return this.service.getNews(keyword || '부동산');
  }
}
