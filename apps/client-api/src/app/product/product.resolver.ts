import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  AccountProductService,
  CreateProductInput,
  Product,
} from 'services';

@Resolver(() => Product)
export class ProductResolver {
  constructor(
    private readonly accountProductService: AccountProductService
  ) {}

  @Query(() => [Product])
  async products(){
    return []
  }

  @Mutation(() => Product, { name: 'addProduct' })
  async addProduct(@Args('input') input: CreateProductInput): Promise<Product> {
    const accountId = '23a91694-1291-4345-91c0-6d93b4c89d7c';
    return this.accountProductService.addProduct(input, accountId);
  }
}
