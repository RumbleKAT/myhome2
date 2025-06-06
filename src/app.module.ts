import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { HomeModule } from './home/home.module';
import { RateModule } from './rate/rate.module';
import { NewsModule } from './news/news.module';
import { DataModule } from './data/data.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    CacheModule.register({}),
    HomeModule,
    RateModule,
    NewsModule,
    DataModule,
    ReportModule,
  ],
})
export class AppModule {}
