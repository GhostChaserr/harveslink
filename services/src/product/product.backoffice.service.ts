import { Injectable, Logger } from '@nestjs/common';
import { ProductDatabaseService } from './product.database.service';
import { CreateProductFilterInput } from './product.database.service.interface';
import { createProductsFilter } from './product.backoffice.service.helpers';

@Injectable()
export class ProductBackOfficeService {
  private readonly logger: Logger = new Logger(ProductBackOfficeService.name);
  constructor(
    protected readonly productDatabaseService: ProductDatabaseService
  ) {}

  public async readProductsPaginated(
    page: number,
    limit: number,
    filter?: CreateProductFilterInput
  ) {
    this.logger.debug('page:', page);
    this.logger.debug('limit:', limit);

    const where = createProductsFilter(filter);
    this.logger.debug('where:', where);

    return this.productDatabaseService.paginate(
      {
        page,
        limit,
      },
      where
    );
  }
}
