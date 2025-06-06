import { NestFactory, Reflector } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import * as express from 'express';
import { Request, Response } from 'express';

let cachedServer: express.Express | null = null;

async function bootstrap(): Promise<express.Express> {
  const expressInstance = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  app.useGlobalInterceptors(new LoggingInterceptor(new Reflector()));
  await app.init();
  return expressInstance;
}

export default async function handler(req: Request, res: Response) {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return cachedServer!(req, res);
}
