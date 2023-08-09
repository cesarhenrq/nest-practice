import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  ParseIntPipe,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import { CostumersService } from './costumers.service';
import { CreateCostumerDto } from './dto/create-costumer.dto';
import { UpdateCostumerDto } from './dto/update-costumer.dto';

@Controller('costumers')
export class CostumersController {
  constructor(private readonly costumersService: CostumersService) {}

  @Post()
  create(@Body() createCostumerDto: CreateCostumerDto) {
    return this.costumersService.create(createCostumerDto);
  }

  @Get()
  findAll(@Query('firstName') firstName?: string) {
    return this.costumersService.findAll(firstName);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    try {
      const costumer = this.costumersService.findOne(+id);
      if (!costumer) {
        throw new NotFoundException(`Costumer not found`);
      }

      return costumer;
    } catch (error) {
      return {
        statusCode: error.status || 500,
        message: error.message || 'Internal Server Error',
        error: error.name || 'Internal Server Error',
      };
    }
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body(new ValidationPipe()) updateCostumerDto: UpdateCostumerDto,
  ) {
    try {
      const updatedCostumer = this.costumersService.update(
        +id,
        updateCostumerDto,
      );

      if (!updatedCostumer) {
        throw new NotFoundException(`Costumer not found`);
      }

      return updatedCostumer;
    } catch (error) {
      return {
        statusCode: error.status || 500,
        message: error.message || 'Internal Server Error',
        error: error.name || 'Internal Server Error',
      };
    }
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: string) {
    try {
      const deletedCostumer = this.costumersService.remove(+id);

      if (!deletedCostumer) {
        throw new NotFoundException(`Costumer not found`);
      }
    } catch (error) {
      return {
        statusCode: error.status || 500,
        message: error.message || 'Internal Server Error',
        error: error.name || 'Internal Server Error',
      };
    }
  }
}
