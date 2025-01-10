import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';

@ObjectType()
export class PaginationMeta {
  @Field(() => Float)
  itemCount: number;
  @Field(() => Float)
  totalItems: number;
  @Field(() => Float)
  itemsPerPage: number;
  @Field(() => Float)
  totalPages: number;
  @Field(() => Float)
  currentPage: number;
}

@ObjectType()
export class PaginatedProducts {
  @Field(() => [Product])
  items: Product[];

  @Field(() => PaginationMeta)
  meta: PaginatedProducts;
}