import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor(new Reflector()));
  const port = process.env.PORT || 3000;
  await app.listen(port as number);
  console.log(`Listening on port ${port}`);
}
bootstrap();
