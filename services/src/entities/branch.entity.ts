import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Account } from './account.entity';
import { Product } from './product.entity';

@ObjectType()
@Entity('branches')
export class Branch {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  country: string;

  @Field(() => String)
  @Column()
  city: string;

  @Field(() => String)
  @Column()
  address: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  cover: string;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'float', nullable: true })
  locationLat?: number;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'float', nullable: true })
  locationLon?: number;

  @ManyToOne(() => Account, (account) => account.branches, {
    onDelete: 'CASCADE',
    eager: true, // automatically load farmer data if needed
  })
  account: Account;

  @OneToMany(() => Product, (listing) => listing.account)
  products: Product[];

  @Field(() => Date, { nullable: true })
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn()
  updatedAt: Date;
}
