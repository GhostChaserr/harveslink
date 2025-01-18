import { Module } from '@nestjs/common';

import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  AccountModule,
  AccountProductModule,
  CategoryModule,
  DatabaseConnectionModule,
  ProductModule,
  ReservationsModule,
  BranchModule,
  UnitModule,
  AuthModule,
  UploadModule,
} from 'services';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductResolver } from './product/product.resolver';
import { AccountResolver } from './account/account.resolver';
import { CategoryResolver } from './category/category.resolver';
import { UnitResolver } from './unit/unit.resolver';
import { ReservationsResolver } from './reservations/reservations.resolver';
import { GraphileWorkerModule } from 'nestjs-graphile-worker';
import { BranchResolver } from './branch/branch.resolver';
import { OtpTaskHandler } from './tasks/otp.tasks.handlers';
import { AuthResolver } from './auth/auth.resolver';
import { NestjsFormDataModule } from 'nestjs-form-data'
import { ProductController } from './product/product.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AccountModule,
    AuthModule,
    ProductModule,
    ReservationsModule,
    NestjsFormDataModule,
    CategoryModule,
    UnitModule,
    UploadModule,
    BranchModule,
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
    AccountProductModule,
    DatabaseConnectionModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'client-api.gql'),
    }),
  ],
  controllers: [ProductController],
  providers: [
    BranchResolver,
    OtpTaskHandler,
    ReservationsResolver,
    ProductResolver,
    AccountResolver,
    CategoryResolver,
    UnitResolver,
    AuthResolver,
  ],
})
export class AppModule {}
