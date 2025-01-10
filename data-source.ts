/* eslint-disable @nx/enforce-module-boundaries */
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { SeederOptions } from 'typeorm-extension';
import { Account } from './services/src/entities/account.entity';
import { Product } from './services/src/entities/product.entity';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

console.log(
  'creds:',
  process.env.POSTGRES_HOST,
  process.env.POSTGRES_PORT,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  process.env.POSTGRES_DB
);

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: true,
  entities: [Account, Product],
  seeds: [join(__dirname, '/**/seeds/*.{ts,js}')],
  factories: [join(__dirname, '/**/factories/*.{ts,js}')],
  migrations: [join(__dirname, '/**/migrations/*.{ts,js}')],
};
export const AppDataSource = new DataSource(options);

// business_ids[]
