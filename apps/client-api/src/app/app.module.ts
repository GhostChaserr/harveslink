import { Module } from '@nestjs/common';

import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  AccountModule,
  AccountProductModule,
  CategoryModule,
  DatabaseConnectionModule,
  DatabaseTaskWorkerConnectionModule,
  ProductModule,
  ReservationsModule,
  UnitModule,
} from 'services';
import { ConfigModule } from '@nestjs/config';
import { ProductResolver } from './product/product.resolver';
import { AccountResolver } from './account/account.resolver';
import { CategoryResolver } from './category/category.resolver';
import { UnitResolver } from './unit/unit.resolver';
import { ReservationsTasksHandler } from './reservations/reservations.tasks.handlers';
import { ReservationsResolver } from './reservations/reservations.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AccountModule,
    ProductModule,
    ReservationsModule,
    CategoryModule,
    UnitModule,
    AccountProductModule,
    DatabaseConnectionModule,
    DatabaseTaskWorkerConnectionModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'client-api.gql'),
    }),
  ],
  controllers: [],
  providers: [
    ReservationsResolver,
    ReservationsTasksHandler,
    ProductResolver,
    AccountResolver,
    CategoryResolver,
    UnitResolver,
  ],
})
export class AppModule {}
