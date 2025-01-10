import { Module } from '@nestjs/common';

import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  AccountModule,
  AccountProductModule,
  DatabaseConnectionModule,
  ProductModule,
} from 'services';
import { ConfigModule } from '@nestjs/config';
import { ProductResolver } from './product/product.resolver';
import { AccountResolver } from './account/account.resolver';

@Module({
  imports: [
    AccountModule,
    ProductModule,
    AccountProductModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseConnectionModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'client-api.gql'),
    }),
  ],
  controllers: [],
  providers: [ProductResolver, AccountResolver],
})
export class AppModule {}
