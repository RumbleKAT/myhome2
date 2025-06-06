import { NestFactory, Reflector } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

const expressApp = express();
let initialized = false;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  app.useGlobalInterceptors(new LoggingInterceptor(new Reflector()));
  await app.init();
  initialized = true;
}

export default async function handler(req: express.Request, res: express.Response) {
  if (!initialized) {
    await bootstrap();
  }
  expressApp(req, res);
}
