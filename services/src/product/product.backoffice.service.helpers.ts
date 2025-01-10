import {
  FindOptionsWhere,
  Between,
  MoreThanOrEqual,
  LessThanOrEqual,
} from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductFilterInput } from './product.database.service.interface';

export function createProductsFilter(input?: CreateProductFilterInput) {
  // Start with an empty where object.
  const where: FindOptionsWhere<Product> = {};

  if (!input) return where;

  if (input.id) {
    where.id = input.id;
  }

  if (input.productName) {
    where.productName = input.productName;
  }

  if (input.category) {
    where.category = input.category;
  }

  if (input.priceGte != null && input.priceLte != null) {
    where.price = Between(input.priceGte, input.priceLte);
  } else if (input.priceGte != null) {
    where.price = MoreThanOrEqual(input.priceGte);
  } else if (input.priceLte != null) {
    where.price = LessThanOrEqual(input.priceLte);
  }

  if (
    input.quantityAvailableGte != null &&
    input.quantityAvailableLte != null
  ) {
    where.quantityAvailable = Between(
      input.quantityAvailableGte,
      input.quantityAvailableLte
    );
  } else if (input.quantityAvailableGte != null) {
    where.quantityAvailable = MoreThanOrEqual(input.quantityAvailableGte);
  } else if (input.quantityAvailableLte != null) {
    where.quantityAvailable = LessThanOrEqual(input.quantityAvailableLte);
  }

  if (input.expiryDateGte && input.expiryDateLte) {
    where.expiryDate = Between(input.expiryDateGte, input.expiryDateLte);
  } else if (input.expiryDateGte) {
    where.expiryDate = MoreThanOrEqual(input.expiryDateGte);
  } else if (input.expiryDateLte) {
    where.expiryDate = LessThanOrEqual(input.expiryDateLte);
  }

  return where;
}
