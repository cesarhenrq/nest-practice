import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateCostumerDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsInt()
  age: number;
}
