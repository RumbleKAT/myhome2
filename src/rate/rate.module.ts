import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { RateController } from './controllers/rate.controller';
import { RateService } from './services/rate.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [RateController],
  providers: [RateService],
})
export class RateModule {}
