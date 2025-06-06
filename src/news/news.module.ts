import { Module } from '@nestjs/common';
import { NewsController } from './controllers/news.controller';
import { NewsService } from './services/news.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
