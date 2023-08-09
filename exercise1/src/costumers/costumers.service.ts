import { Injectable, Query } from '@nestjs/common';
import { CreateCostumerDto } from './dto/create-costumer.dto';
import { UpdateCostumerDto } from './dto/update-costumer.dto';
import { Costumer } from './entities/costumer.entity';

@Injectable()
export class CostumersService {
  repository: Costumer[] = [];

  create(createCostumerDto: CreateCostumerDto): Costumer {
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

  findOne(id: number): Costumer | null {
    return this.repository.find((costumer) => costumer.id === id);
  }

  update(id: number, updateCostumerDto: UpdateCostumerDto): Costumer | null {
    const costumer = this.findOne(id);

    if (!costumer) {
      return null;
    }
    return { ...costumer, ...updateCostumerDto };
  }

  remove(id: number): Costumer | null {
    const costumer = this.findOne(id);

    if (!costumer) {
      return null;
    }

    this.repository = this.repository.filter((costumer) => costumer.id !== id);

    return costumer;
  }
}
