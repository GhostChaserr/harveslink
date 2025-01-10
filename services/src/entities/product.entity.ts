import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ListingStatus } from '../enums/entities.enums';
import { Account } from './account.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Account, (account) => account.products, {
    onDelete: 'CASCADE',
    eager: true, // automatically load farmer data if needed
  })
  farmer: Account;

  @Column()
  productName: string;

  @Column({ default: 'General' })
  category: string;

  @Column({ nullable: true })
  description: string;

  @Column('float', { default: 0 })
  price: number;
  
  @Column({ default: 'GEO' })
  country: string;

  @Column({ default: 'kg' })
  unit: string;

  @Column('float', { default: 0 })
  quantityAvailable: number;

  @Column({ type: 'date', nullable: true })
  expiryDate: Date;

  @Column({ type: 'text', array: true, default: [] })
  photos: string[];

  @Column({
    type: 'enum',
    enum: ListingStatus,
    default: ListingStatus.ACTIVE,
  })
  status: ListingStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
