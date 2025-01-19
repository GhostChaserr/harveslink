import { registerEnumType } from '@nestjs/graphql';

export enum AccountType {
  FARMER = 'farmer',
  RESTAURANT = 'restaurant',
  CONSUMER = 'consumer',
  CHARITY = 'charity',
  ADMIN = 'admin',
}

export enum ListingStatus {
  ACTIVE = 'active',
  SOLD_OUT = 'sold_out',
  EXPIRED = 'expired',
}

export enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

export enum PaymentMethod {
  STRIPE = 'stripe',
  PAYPAL = 'paypal',
  CASH_ON_DELIVERY = 'cash_on_delivery',
  OTHER = 'other',
}

export enum TransactionStatus {
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum DeliveryStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  DELIVERED = 'delivered',
}

export enum CategoryEnum {
  FRUITS = 'Fruits',
  VEGETABLES = 'Vegetables',
  GRAINS = 'Grains',
  NUTS = 'Nuts',
  SEEDS = 'Seeds',
  LEGUMES = 'Legumes',
  HERBS_SPICES = 'Herbs & Spices',
  DAIRY = 'Dairy',
  EGGS = 'Eggs',
  MEAT = 'Meat',
  SEAFOOD = 'Seafood',
  BAKED_GOODS = 'Baked Goods',
  BEVERAGES = 'Beverages',
  PROCESSED = 'Processed Foods', // e.g. jams, pickles, sauces
  OTHER = 'Other',
}

export enum UnitEnum {
  KG = 'kg',
  GRAM = 'g',
  POUND = 'lb',
  OUNCE = 'oz',
  LITER = 'l',
  MILLILITER = 'ml',
  BUSHEL = 'bushel',
  CRATE = 'crate',
  BOX = 'box',
  BAG = 'bag',
  BUNCH = 'bunch', // e.g. for herbs, leafy greens, grapes
  DOZEN = 'dozen', // e.g. eggs
  UNIT = 'unit', // e.g. single count items (like individual melons)
  PACK = 'pack', // e.g. packaged goods
  TRAY = 'tray',
  OTHER = 'other',
}

export enum ReservationStatusEnum {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export enum AuctionStatus {
  PENDING = 'PENDING',
  STARTED = 'STARTED',
  CLOSED = 'CLOSED',
  BIDDING = 'BIDDING',
  TIMEOUT = 'TIMEOUT',
}

registerEnumType(AuctionStatus, {
  name: 'AuctionStatusEnum', // GraphQL type name
  description: 'Different types of auction types', // optional description
});

registerEnumType(ReservationStatusEnum, {
  name: 'ReservationStatusEnum', // GraphQL type name
  description: 'Different types of reservation status enums', // optional description
});

registerEnumType(CategoryEnum, {
  name: 'CategoryEnum', // GraphQL type name
  description: 'Different types of categories', // optional description
});

registerEnumType(UnitEnum, {
  name: 'UnitEnum', // GraphQL type name
  description: 'Different types of units', // optional description
});

// Register each enum with GraphQL
registerEnumType(AccountType, {
  name: 'AccountType', // GraphQL type name
  description: 'Different types of accounts', // optional description
});

registerEnumType(ListingStatus, {
  name: 'ListingStatus',
  description: 'Possible statuses for a listing',
});

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
  description: 'Possible statuses for an order',
});

registerEnumType(PaymentMethod, {
  name: 'PaymentMethod',
  description: 'Available payment methods',
});

registerEnumType(TransactionStatus, {
  name: 'TransactionStatus',
  description: 'Possible statuses for a transaction',
});

registerEnumType(DeliveryStatus, {
  name: 'DeliveryStatus',
  description: 'Possible statuses for a delivery',
});
