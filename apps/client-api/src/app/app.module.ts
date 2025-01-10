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
} from 'services';
import { ConfigModule } from '@nestjs/config';
import { ProductResolver } from './product/product.resolver';
import { AccountResolver } from './account/account.resolver';
import { CategoryResolver } from './category/category.resolver';

@Module({
  imports: [
    AccountModule,
    ProductModule,
    CategoryModule,
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
  providers: [ProductResolver, AccountResolver, CategoryResolver],
})
export class AppModule {}
