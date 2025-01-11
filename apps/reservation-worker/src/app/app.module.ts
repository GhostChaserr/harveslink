import { Module } from '@nestjs/common';

import {
  AccountProductModule,
  DatabaseConnectionModule,
  ReservationsModule,
} from 'services';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ReservationsTasksHandler } from './reservations.tasks.handlers';
import { GraphileWorkerModule } from 'nestjs-graphile-worker';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphileWorkerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const user = configService.get<string>('POSTGRES_USER');
        const password = configService.get<string>('POSTGRES_PASSWORD');
        const host = configService.get<string>('POSTGRES_HOST');
        const port = configService.get<string>('POSTGRES_PORT');
        const db = configService.get<string>('POSTGRES_DB');
        const connectionString = `postgres://${user}:${password}@${host}:${port}/${db}`;
        return {
          connectionString,
          concurrency: 1,
        };
      },
      inject: [ConfigService],
    }),
    ReservationsModule,
    AccountProductModule,
    DatabaseConnectionModule,
  ],
  controllers: [],
  providers: [ReservationsTasksHandler],
})
export class AppModule {}
