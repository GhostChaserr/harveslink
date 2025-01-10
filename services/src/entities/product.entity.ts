import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { CategoryEnum, ListingStatus, UnitEnum } from '../enums/entities.enums';
import { Account } from './account.entity';

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

  @Field(() => String)
  @Column()
  productName: string;

  // Replace string columns with the Category enum
  @Field(() => CategoryEnum)
  @Column({
    type: 'enum',
    enum: CategoryEnum,
    default: CategoryEnum.OTHER,
  })
  category: CategoryEnum;

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

  @Field(() => UnitEnum)
  @Column({
    type: 'enum',
    enum: UnitEnum,
    default: UnitEnum.KG,
  })
  unit: UnitEnum;
  
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
