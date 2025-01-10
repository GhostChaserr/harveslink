import { Query, Resolver } from '@nestjs/graphql';

import { Product, ProductService } from 'services';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product], { name: 'products' })
  async products(): Promise<Product[]> {
    return this.productService.findAll();
  }
}
