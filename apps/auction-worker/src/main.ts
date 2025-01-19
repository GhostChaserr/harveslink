/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { WorkerService } from 'nestjs-graphile-worker';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.get(WorkerService).run();
  await app.init();
  Logger.log(`🚀 Reservation worker is running:`, process.pid);
}

bootstrap();
