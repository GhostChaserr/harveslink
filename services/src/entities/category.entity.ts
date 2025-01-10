import { Entity, PrimaryGeneratedColumn, OneToMany, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Product } from './product.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { CategoryEnum } from '../enums/entities.enums';

@ObjectType()
@Entity('categories')
export class Category {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => CategoryEnum)
  @Column({
    type: 'enum',
    enum: CategoryEnum,
    default: CategoryEnum.OTHER,
  })
  category: CategoryEnum;

  @OneToMany(() => Product, (listing) => listing.category)
  products: Product[];

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
