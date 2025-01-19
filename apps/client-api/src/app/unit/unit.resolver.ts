import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Unit, CreateUnitInput, UnitDatabaseService } from 'services';

@Resolver(() => Unit)
export class UnitResolver {
  constructor(private readonly service: UnitDatabaseService) {}

  @Mutation(() => Unit, { name: 'createUnit' })
  async createUnit(@Args('input') input: CreateUnitInput): Promise<Unit> {
    return this.service.create(input);
  }

  @Query(() => [Unit], { name: 'units' })
  async units(): Promise<Unit[]> {
    return this.service.readUnits({});
  }
}
