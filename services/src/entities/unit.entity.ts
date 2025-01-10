import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { UnitEnum } from '../enums/entities.enums';
import { Product } from './product.entity';

@ObjectType()
@Entity('units')
export class Unit {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => UnitEnum)
  @Column({
    type: 'enum',
    enum: UnitEnum,
    default: UnitEnum.OTHER,
  })
  name: UnitEnum;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Product, (listing) => listing.unit)
  products: Product[];
}
