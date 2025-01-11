import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../entities/account.entity';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
import { Unit } from '../entities/unit.entity';
import { Reservation } from '../entities/reservation.entity';
import { Branch } from '../entities/branch.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const host = configService.get<string>('POSTGRES_HOST');
        const port = configService.get<number>('POSTGRES_PORT');
        const username = configService.get<string>('POSTGRES_USER');
        const password = configService.get<string>('POSTGRES_PASSWORD');
        const database = configService.get<string>('POSTGRES_DB', 'postgres');
        return {
          type: 'postgres' as const,
          host,
          port,
          username,
          password,
          database,
          entities: [Account, Product, Category, Unit, Reservation, Branch],
          synchronize: false,
          dropSchema: false,
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseConnectionModule {}
