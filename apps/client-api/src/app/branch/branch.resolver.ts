import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  Branch,
  BranchDatabaseService,
  BranchService,
  CreateBranchInput,
} from 'services';

@Resolver(() => Branch)
export class BranchResolver {
  constructor(
    private readonly service: BranchService,
    protected readonly databaseService: BranchDatabaseService
  ) {}

  @Mutation(() => Branch, { name: 'createBranch' })
  async createBranch(@Args('input') input: CreateBranchInput): Promise<Branch> {
    const accountId = '23a91694-1291-4345-91c0-6d93b4c89d7c';
    return this.service.create(accountId, input);
  }

  @Query(() => [Branch], { name: 'branches' })
  async branches(): Promise<Branch[]> {
    const accountId = '23a91694-1291-4345-91c0-6d93b4c89d7c';
    return this.databaseService.readBranches({
      where: {
        account: {
          id: accountId,
        },
      },
    });
  }
}
