import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateProductInput } from '../product/product.database.service.interface';
import { ProductDatabaseService } from '../product/product.database.service';
import { AccountDatabaseService } from '../account/account.database.service';

@Injectable()
export class AccountProductService {
  constructor(
    private readonly productDatabaseService: ProductDatabaseService,
    private readonly accountDatabaseService: AccountDatabaseService
  ) {}

  async addProduct(input: CreateProductInput, accountId: string) {
    const account = await this.accountDatabaseService.readAccount({
      where: {
        id: accountId,
      },
    });
    if (!account) throw new NotFoundException('Account Not Found');
    const product = await this.productDatabaseService.create(input);
    return product;
  }
}
