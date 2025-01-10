import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Account } from './account.entity';
import { Product } from './product.entity';
import { ReservationStatusEnum } from '../enums/entities.enums';

@ObjectType()
@Entity('reservations')
export class Reservation {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @ManyToOne(() => Account, (account) => account.reservations, {
    onDelete: 'CASCADE',
  })
  account: Account;

  @ManyToOne(() => Product, (account) => account.reservations, {
    onDelete: 'CASCADE',
  })
  product: Product;
}
