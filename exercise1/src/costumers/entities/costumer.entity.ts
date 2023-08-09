import { ApiProperty } from '@nestjs/swagger';
import { CreateCostumerDto } from '../dto/create-costumer.dto';

export class Costumer {
  @ApiProperty({ example: 1, description: 'The id of the Costumer' })
  id: number = new Date().getTime();

  @ApiProperty({
    example: 'John',
    description: 'The first name of the Costumer',
  })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the Costumer' })
  lastName: string;

  @ApiProperty({ example: 30, description: 'The age of the Costumer' })
  age: number;

  constructor(createCostumerDto: CreateCostumerDto) {
    this.firstName = createCostumerDto.firstName;
    this.lastName = createCostumerDto.lastName;
    this.age = createCostumerDto.age;
  }
}
