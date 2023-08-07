import { Injectable, Query } from '@nestjs/common';
import { CreateCostumerDto } from './dto/create-costumer.dto';
import { UpdateCostumerDto } from './dto/update-costumer.dto';
import { Costumer } from './entities/costumer.entity';

@Injectable()
export class CostumersService {
  repository: Costumer[] = [];

  create(createCostumerDto: CreateCostumerDto) {
    const costumer = new Costumer(createCostumerDto);
    this.repository.push(costumer);
    return costumer;
  }

  findAll(firstName?): Costumer[] {
    if (!firstName) {
      return this.repository;
    }
    return this.repository.filter(
      (costumer) => costumer.firstName === firstName,
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} costumer`;
  }

  update(id: number, updateCostumerDto: UpdateCostumerDto) {
    return `This action updates a #${id} costumer`;
  }

  remove(id: number) {
    return `This action removes a #${id} costumer`;
  }
}
