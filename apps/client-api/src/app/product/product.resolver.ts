import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  AccountProductService,
  CreateProductFilterInput,
  CreateProductInput,
  PaginatedProducts,
  Product,
  ProductBackOfficeService,
} from 'services';

@Resolver(() => Product)
export class ProductResolver {
  constructor(
    private readonly accountProductService: AccountProductService,
    private readonly productBackOfficeService: ProductBackOfficeService
  ) {}

  @Query(() => PaginatedProducts)
  async products(
    @Args('page') page: number,
    @Args('limit') limit: number,
    @Args('filter', { nullable: true }) filter?: CreateProductFilterInput
  ) {
    return this.productBackOfficeService.readProductsPaginated(
      page,
      limit,
      filter
    );
  }

  @Mutation(() => Product, { name: 'addProduct' })
  async createProduct(
    @Args('input') input: CreateProductInput
  ): Promise<Product> {
    const accountId = '23a91694-1291-4345-91c0-6d93b4c89d7c';
    return this.accountProductService.addProduct(input, accountId);
  }
  
}
