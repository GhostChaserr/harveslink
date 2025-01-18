import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  AccountProductService,
  AuthGuard,
  CreateProductFilterInput,
  CreateProductInput,
  PaginatedProducts,
  Product,
  ProductBackOfficeService,
  Session,
  SessionD,
} from 'services';

@UseGuards(AuthGuard)
@Resolver(() => Product)
export class ProductResolver {
  constructor(
    private readonly accountProductService: AccountProductService,
    private readonly productBackOfficeService: ProductBackOfficeService
  ) {}

  @Query(() => PaginatedProducts)
  async products(
    @SessionD() session: Session,
    @Args('page') page: number,
    @Args('limit') limit: number,
    @Args('filter', { nullable: true }) filter?: CreateProductFilterInput
  ) {
    const accountId = session.id;
    filter.id = accountId;
    return this.productBackOfficeService.readProductsPaginated(
      page,
      limit,
      filter
    );
  }

  @Mutation(() => Product, { name: 'addProduct' })
  async createProduct(
    @SessionD() session: Session,
    @Args('input') input: CreateProductInput
  ): Promise<Product> {
    const accountId = session.id;
    return this.accountProductService.addProduct(input, accountId);
  }
}
