import { PartialType } from '@nestjs/mapped-types';
import { CreateCostumerDto } from './create-costumer.dto';

export class UpdateCostumerDto extends PartialType(CreateCostumerDto) {
  firstName?: string;
  lastName?: string;
  age?: number;
}
