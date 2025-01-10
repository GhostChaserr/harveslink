import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { Account } from './account.entity';
import { Product } from './product.entity';
import { ReservationStatusEnum } from '../enums/entities.enums';

@ObjectType()
export class ProductUsageDetails {
  @Field(() => GraphQLJSON)
  details: Record<string, string>;
}

@ObjectType()
@Entity('reservations')
export class Reservation {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column({ unique: true })
  code: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => ReservationStatusEnum)
  @Column({
    type: 'enum',
    enum: ReservationStatusEnum,
    nullable: false,
  })
  status: ReservationStatusEnum;

  @Field(() => Account)
  @ManyToOne(() => Account, (account) => account.reservations, {
    onDelete: 'CASCADE',
    eager: true,
  })
  account: Account;

  @Field(() => GraphQLJSON, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  productUsageDetails?: ProductUsageDetails;

  @Field(() => [Product])
  @ManyToMany(() => Product, (product) => product.reservations, {
    eager: true,
  })
  @JoinTable()
  products: Product[];
}
