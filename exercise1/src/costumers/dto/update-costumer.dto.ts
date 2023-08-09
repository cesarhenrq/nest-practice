import { PartialType } from '@nestjs/mapped-types';
import { CreateCostumerDto } from './create-costumer.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCostumerDto extends PartialType(CreateCostumerDto) {
  @ApiProperty()
  firstName?: string;

  @ApiProperty()
  lastName?: string;

  @ApiProperty()
  age?: number;
}
