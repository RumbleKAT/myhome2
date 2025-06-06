import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { HomeController } from './controllers/home.controller';
import { HomeService } from './services/home.service';
import { ExternalHomeRepository } from './repositories/external-home.repository';

@Module({
  imports: [CacheModule.register()],
  controllers: [HomeController],
  providers: [
    HomeService,
    { provide: 'HomeRepository', useClass: ExternalHomeRepository },
  ],
  exports: [HomeService, 'HomeRepository']
})
export class HomeModule {}
