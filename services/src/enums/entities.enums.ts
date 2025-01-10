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
