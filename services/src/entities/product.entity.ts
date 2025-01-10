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

@ObjectType()
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Account, (account) => account.products, {
    onDelete: 'CASCADE',
    eager: true, // automatically load farmer data if needed
  })
  farmer: Account;

  @Field(() => String)
  @Column()
  productName: string;

  @Field(() => String)
  @Column({ default: 'General' })
  category: string;

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
  @Column({ default: 'kg' })
  unit: string;

  @Field(() => Float)
  @Column('float', { default: 0 })
  quantityAvailable: number;

  @Field(() => Date)
  @Column({ type: 'date', nullable: true })
  expiryDate: Date;

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
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
