import { InputType, Field } from '@nestjs/graphql';
import { UnitEnum } from '../enums/entities.enums';

@InputType()
export class CreateUnitInput {
  @Field(() => UnitEnum)
  name: UnitEnum;
}
