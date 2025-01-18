import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { AccountType } from '../enums/entities.enums';
import { Product } from './product.entity';
import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Branch } from './branch.entity';

@ObjectType()
@Entity('accounts')
export class Account {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  fullName: string;

  @Field(() => String)
  @Column()
  avatar: string;

  @Field(() => String, { nullable: true })
  @Column()
  country?: string;

  @Field(() => String, { nullable: true })
  @Column()
  city?: string;

  @Field(() => String, { nullable: true })
  @Column()
  address?: string;

  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true })
  languages?: string[];

  @Field(() => String)
  @Column({ unique: true, nullable: true })
  email?: string;

  @Field(() => String)
  @Column({ nullable: true })
  password?: string;

  @Field(() => AccountType)
  @Column({
    type: 'enum',
    enum: AccountType,
    default: AccountType.CONSUMER,
  })
  accountType: AccountType;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  phone?: string;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'float', nullable: true })
  locationLat?: number;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'float', nullable: true })
  locationLon?: number;

  @Field(() => Float)
  @Column({ type: 'float', default: 0 })
  ratingAverage: number;

  @Field(() => Float)
  @Column({ type: 'int', default: 0 })
  reviewsCount: number;

  @Field(() => Date, { nullable: true })
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Product, (listing) => listing.account)
  products: Product[];

  @OneToMany(() => Branch, (listing) => listing.account)
  branches: Product[];

  @OneToMany(() => Product, (listing) => listing.account)
  reservations: Product[];
}
