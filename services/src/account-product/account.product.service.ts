import { Injectable, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker'; // import faker
import { CreateProductInput } from '../product/product.database.service.interface';
import { ProductDatabaseService } from '../product/product.database.service';
import { AccountDatabaseService } from '../account/account.database.service';
import { Product } from '../entities/product.entity';
import { UnitEnum } from '../enums/entities.enums';
import { CategoryDatabaseService } from '../category/category.database.service';

@Injectable()
export class AccountProductService {
  constructor(
    private readonly productDatabaseService: ProductDatabaseService,
    private readonly accountDatabaseService: AccountDatabaseService,
    private readonly categoryDatabaseService: CategoryDatabaseService
  ) {}

  async createNproducts(amount: number): Promise<Product[]> {
    const accountId = '23a91694-1291-4345-91c0-6d93b4c89d7c';
    const categorId = 'b9c7bafa-6d45-4f7e-a65c-4828484e3c04';
    const products: CreateProductInput[] = [];

    // account
    const account = await this.accountDatabaseService.readAccount({
      where: {
        id: accountId,
      },
    });
    if (!account) throw new NotFoundException('Account Not Found');

    // category
    const category = await this.categoryDatabaseService.readCategory({
      where: {
        id: categorId,
      },
    });

    if (!category) throw new NotFoundException('Account Not Found');

    for (let i = 0; i < amount; i++) {
      const sampleProduct: CreateProductInput = {
        productName: faker.commerce.productName(),
        categoryId: categorId,
        category: category,
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price({ min: 0, max: 5 })) || 0, // default 0 if not provided
        country: faker.address.countryCode() || 'GEO', // default 'GEO'
        unit: faker.helpers.arrayElement([
          UnitEnum.BAG,
          UnitEnum.CRATE,
          UnitEnum.DOZEN,
          UnitEnum.POUND,
        ]),
        quantityAvailable: parseInt(faker.commerce.price({ min: 0, max: 900 })), // default 0
        expiryDate: faker.date.future(),
        account: account, // create a fake account for the product
      };
      products.push(sampleProduct);
    }

    const instances = products.map((product) =>
      this.productDatabaseService.createInstance(product)
    );
    const records = await this.productDatabaseService.bulkCreate(instances);

    return records;
  }

  async addProduct(input: CreateProductInput, accountId: string) {
    const account = await this.accountDatabaseService.readAccount({
      where: {
        id: accountId,
      },
    });
    if (!account) throw new NotFoundException('Account Not Found');
    const category = await this.categoryDatabaseService.readCategory({
      where: {
        id: input.categoryId,
      },
    });
    if (!category) throw new NotFoundException('category not found!');
    input.category = category;
    input.account = account;
    const product = await this.productDatabaseService.create(input);
    return product;
  }
}
