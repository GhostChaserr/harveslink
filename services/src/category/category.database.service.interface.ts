import { InputType, Field } from '@nestjs/graphql';
import { CategoryEnum } from '../enums/entities.enums';

@InputType()
export class CreateCategoryInput {

  @Field(() => CategoryEnum)
  category: CategoryEnum;
}
