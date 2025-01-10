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

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: AccountType,
    default: AccountType.CONSUMER,
  })
  accountType: AccountType;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'float', nullable: true })
  locationLat: number;

  @Column({ type: 'float', nullable: true })
  locationLon: number;

  @Column({ type: 'float', default: 0 })
  ratingAverage: number;

  @Column({ type: 'int', default: 0 })
  reviewsCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Product, (listing) => listing.farmer)
  products: Product[];
}
