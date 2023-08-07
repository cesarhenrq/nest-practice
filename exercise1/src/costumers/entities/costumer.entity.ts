import { CreateCostumerDto } from '../dto/create-costumer.dto';

export class Costumer {
  id: number = new Date().getTime();
  firstName: string;
  lastName: string;
  age: number;

  constructor(createCostumerDto: CreateCostumerDto) {
    this.firstName = createCostumerDto.firstName;
    this.lastName = createCostumerDto.lastName;
    this.age = createCostumerDto.age;
  }
}
