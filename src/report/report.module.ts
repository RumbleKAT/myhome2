import { Module } from '@nestjs/common';
import { ReportController } from './controllers/report.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { HomeModule } from '../home/home.module';

@Module({
  imports: [CacheModule.register(), HomeModule],
  controllers: [ReportController],
})
export class ReportModule {}
