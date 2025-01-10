import { Module } from '@nestjs/common';

import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DatabaseConnectionModule, ProductModule } from 'services';
import { ConfigModule } from '@nestjs/config';
import { ProductResolver } from './product/product.resolver';

@Module({
  imports: [
    ProductModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseConnectionModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'client-api.gql'),
    }),
  ],
  controllers: [],
  providers: [ProductResolver],
})
export class AppModule {}
