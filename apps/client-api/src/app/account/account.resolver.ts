import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Account, AccountDatabaseService, CreateAccountInput } from 'services';

@Resolver(() => Account)
export class AccountResolver {
  constructor(private readonly accountDatabaseService: AccountDatabaseService) {}

  @Mutation(() => Account, { name: 'createAccount' })
  async createAccount(
    @Args('input') input: CreateAccountInput
  ): Promise<Account> {
    return this.accountDatabaseService.create(input);
  }
}
