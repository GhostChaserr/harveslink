import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  Product,
  Category,
  CreateCategoryInput,
  CategoryDatabaseService,
} from 'services';

@Resolver(() => Category)
export class  CategoryResolver {
  constructor(
    private readonly categoryDatabaseService: CategoryDatabaseService
  ) {}

  @Query(() => [Category])
  async categories() {
    return this.categoryDatabaseService.readCategories({});
  }

  @Mutation(() => Product, { name: 'createCategory' })
  async createCategory(
    @Args('input') input: CreateCategoryInput
  ): Promise<Category> {
    return this.categoryDatabaseService.create(input);
  }
}
