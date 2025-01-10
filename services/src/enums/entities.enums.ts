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
