import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { ListingStatus } from '../enums/entities.enums';
import { Account } from './account.entity';
import { Category } from './category.entity';
import { Unit } from './unit.entity';

@ObjectType()
@Entity('products')
export class Product {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Account, (account) => account.products, {
    onDelete: 'CASCADE',
    eager: true, // automatically load farmer data if needed
  })
  account: Account;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'SET NULL',
    eager: true,
  })
  category: Category;

  @Field(() => String)
  @Column()
  productName: string;

  @Field(() => String)
  @Column({ nullable: true })
  description: string;

  @Field(() => Float)
  @Column('float', { default: 0 })
  price: number;

  @Field(() => String)
  @Column({ default: 'GEO' })
  country: string;

  @Field(() => String)
  @Column({ default: 'GEL' })
  currency: string;

  @ManyToOne(() => Unit, (unit) => unit.products, {
    onDelete: 'SET NULL',
    eager: true,
  })
  unit: Unit;

  @Field(() => Float)
  @Column('float', { default: 0 })
  quantityAvailable: number;

  @Field(() => Date)
  @Column({ type: 'timestamptz', nullable: true })
  expiryDate: Date;

  @Field(() => Date)
  @Column({ type: 'timestamptz', nullable: true })
  startDate: Date;

  @Field(() => [String])
  @Column({ type: 'text', array: true, default: [] })
  media: string[];

  @Field(() => String)
  @Column({
    type: 'enum',
    enum: ListingStatus,
    default: ListingStatus.ACTIVE,
  })
  status: ListingStatus;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
