import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Account } from './account.entity';
import { Product } from './product.entity';
import { ReservationStatusEnum } from '../enums/entities.enums';

@ObjectType()
@Entity('reservations')
export class Reservation {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column({ unique: true })
  code: string;

  @Field(() => Float, { nullable: true })
  @Column({ nullable: true })
  count?: number;

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

  @Field(() => Product)
  @ManyToOne(() => Product, (account) => account.reservations, {
    onDelete: 'CASCADE',
    eager: true,
  })
  product: Product;
}
