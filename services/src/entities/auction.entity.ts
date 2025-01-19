import { Field, Float, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Product } from './product.entity';
import { Account } from './account.entity';
import { AuctionStatus } from '../enums/entities.enums';

@ObjectType()
@Entity('auctions')
export class Auction {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Product)
  @OneToOne(() => Product, (product) => product.auction, {
    onDelete: 'CASCADE',
    eager: true,
    nullable: false,
  })
  @JoinColumn()
  product: Product;

  @Field(() => Account)
  @ManyToOne(() => Account, (account) => account.auctions, { onDelete: 'CASCADE' })
  account: Account;

  @Field(() => Date)
  @Column({ type: 'timestamptz', nullable: false })
  startDate: Date;

  @Field(() => Date)
  @Column({ type: 'timestamptz', nullable: true })
  endDate: Date;

  @Field(() => Float)
  @Column('float', { default: 0 })
  minBid: number;

  @Field(() => Float, { nullable: true })
  @Column('float', { nullable: true })
  currentBid?: number;

  @Field(() => String)
  @Column({
    type: 'enum',
    enum: AuctionStatus,
    default: AuctionStatus.PENDING,
  })
  status: AuctionStatus;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Field(() => [Bid], { nullable: true })
  @OneToMany(() => Bid, (bid) => bid.auction, {
    cascade: ['insert', 'update'],
    nullable: true,
  })
  bids: Bid[];
}

@ObjectType()
@Entity('bids')
export class Bid {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Auction, { nullable: true })
  @ManyToOne(() => Auction, (auction) => auction.bids, { onDelete: 'CASCADE' })
  auction: Auction;

  @Field(() => Account, { nullable: true })
  @ManyToOne(() => Account, (account) => account.bids, { onDelete: 'CASCADE' })
  account: Account;

  @Field(() => Float)
  @Column('float')
  amount: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;
}
