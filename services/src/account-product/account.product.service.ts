import { Injectable, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker'; // import faker
import { CreateProductInput } from '../product/product.database.service.interface';
import { ProductDatabaseService } from '../product/product.database.service';
import { AccountDatabaseService } from '../account/account.database.service';
import { Product } from '../entities/product.entity';
import { CategoryEnum, UnitEnum } from '../enums/entities.enums';

@Injectable()
export class AccountProductService {
  constructor(
    private readonly productDatabaseService: ProductDatabaseService,
    private readonly accountDatabaseService: AccountDatabaseService
  ) {}

  async createNproducts(amount: number): Promise<Product[]> {
    const accountId = '23a91694-1291-4345-91c0-6d93b4c89d7c';
    const products: CreateProductInput[] = [];
    const account = await this.accountDatabaseService.readAccount({
      where: {
        id: accountId,
      },
    });
    if (!account) throw new NotFoundException('Account Not Found');
    for (let i = 0; i < amount; i++) {
      const sampleProduct: CreateProductInput = {
        productName: faker.commerce.productName(),
        category: faker.helpers.arrayElement([
          CategoryEnum.BAKED_GOODS,
          CategoryEnum.BEVERAGES,
          CategoryEnum.DAIRY,
          CategoryEnum.SEEDS,
        ]), // can default to 'General'
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price({ min: 0, max: 5 })) || 0, // default 0 if not provided
        country: faker.address.countryCode() || 'GEO', // default 'GEO'
        unit: faker.helpers.arrayElement([UnitEnum.BAG, UnitEnum.CRATE, UnitEnum.DOZEN, UnitEnum.POUND]),
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
    const product = await this.productDatabaseService.create(input);
    return product;
  }
}
