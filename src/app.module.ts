import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './services/greeting.service';
import { AppRepository } from './repositories/greeting.repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: 'GreetingRepository', useClass: AppRepository },
  ],
})
export class AppModule {}
