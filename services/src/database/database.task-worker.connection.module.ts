import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphileWorkerModule } from 'nestjs-graphile-worker';

@Module({
  imports: [
    // Import ConfigModule so that we can inject the ConfigService
    // to read our environment variables.
    ConfigModule,
    GraphileWorkerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const user = configService.get<string>('POSTGRES_USER');
        const password = configService.get<string>('POSTGRES_PASSWORD');
        const host = configService.get<string>('POSTGRES_HOST');
        const port = configService.get<string>('POSTGRES_PORT');
        const db = configService.get<string>('POSTGRES_DB');

        // Construct the Postgres connection string dynamically from ENV vars
        const connectionString = `postgres://${user}:${password}@${host}:${port}/${db}`;

        return {
          connectionString,
          // You can pass in additional Graphile Worker options here
          // e.g. concurrency, schema, etc.
          // concurrency: 5,
          // schema: 'graphile_worker',
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [GraphileWorkerModule],
})
export class DatabaseTaskWorkerConnectionModule {}
