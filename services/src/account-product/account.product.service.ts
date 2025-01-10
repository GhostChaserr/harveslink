import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInput } from '../product/product.database.service.interface';
import { ProductDatabaseService } from '../product/product.database.service';
import { AccountDatabaseService } from '../account/account.database.service';
import { CategoryDatabaseService } from '../category/category.database.service';
import { UnitDatabaseService } from '../unit/unit.database.servie';

@Injectable()
export class AccountProductService {
  constructor(
    private readonly productDatabaseService: ProductDatabaseService,
    private readonly accountDatabaseService: AccountDatabaseService,
    private readonly categoryDatabaseService: CategoryDatabaseService,
    private readonly unitDatabaseService: UnitDatabaseService
  ) {}

  private async readAccountCategoryUnit(
    accountId: string,
    categoryId: string,
    unitId: string
  ) {
    const [account, category, unit] = await Promise.all([
      this.accountDatabaseService.readAccount({
        where: {
          id: accountId,
        },
      }),
      this.categoryDatabaseService.readCategory({
        where: {
          id: categoryId,
        },
      }),
      this.unitDatabaseService.readUnit({
        where: {
          id: unitId,
        },
      }),
    ]);

    return {
      account,
      category,
      unit,
    };
  }

  async addProduct(input: CreateProductInput, accountId: string) {
    const { category, account, unit } = await this.readAccountCategoryUnit(
      accountId,
      input.categoryId,
      input.unitId
    );
    if (!category || !account || !unit) {
      throw new NotFoundException('Invalid params');
    }
    input.category = category;
    input.account = account;
    input.unit = unit;
    const product = await this.productDatabaseService.create(input);
    return product;
  }
}
