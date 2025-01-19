import { Module } from '@nestjs/common';

import {
  AccountProductModule,
  AuctionModule,
  DatabaseConnectionModule,
  ProductModule,
  ReservationsModule,
} from 'services';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  AuctionBiddingTaskHandler,
  AuctionClosedTaskHandler,
  ScheduledAuctionTaskHandler,
} from './auction.task.handler';
import { GraphileWorkerModule } from 'nestjs-graphile-worker';
import { AuctionHandler } from './auction.handler';
import { AuctionTaskProcessor } from './auction.task.processor';

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
    ProductModule,
    AuctionModule,
    ReservationsModule,
    AccountProductModule,
    DatabaseConnectionModule,
  ],
  controllers: [],
  providers: [
    AuctionTaskProcessor,
    ScheduledAuctionTaskHandler,
    AuctionClosedTaskHandler,
    AuctionBiddingTaskHandler,
    AuctionHandler,
  ],
})
export class AppModule {}
