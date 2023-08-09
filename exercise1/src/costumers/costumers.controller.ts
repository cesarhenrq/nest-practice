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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { CostumersService } from './costumers.service';
import { CreateCostumerDto } from './dto/create-costumer.dto';
import { UpdateCostumerDto } from './dto/update-costumer.dto';
import { Costumer } from './entities/costumer.entity';

@Controller('costumers')
export class CostumersController {
  constructor(private readonly costumersService: CostumersService) {}

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Costumer,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  @ApiBody({ type: CreateCostumerDto })
  @Post()
  create(@Body() createCostumerDto: CreateCostumerDto) {
    return this.costumersService.create(createCostumerDto);
  }

  @ApiOkResponse({
    description: 'The records has been successfully retrieved.',
    type: Array<Costumer>,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiQuery({ name: 'firstName', required: false })
  @Get()
  findAll(@Query('firstName') firstName?: string) {
    return this.costumersService.findAll(firstName);
  }

  @ApiOkResponse({
    description: 'The record has been successfully retrieved.',
    type: Costumer,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  @ApiNotFoundResponse({ description: 'Costumer not found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    try {
      const costumer = this.costumersService.findOne(+id);
      if (!costumer) {
        throw new NotFoundException(`Costumer not found`);
      }

      return costumer;
    } catch (error) {
      return this.handleErrorResponse(error);
    }
  }

  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: Costumer,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Costumer not found' })
  @ApiBody({ type: UpdateCostumerDto })
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
      return this.handleErrorResponse(error);
    }
  }

  @ApiNoContentResponse({
    description: 'The record has been successfully deleted.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Costumer not found' })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: string) {
    try {
      const deletedCostumer = this.costumersService.remove(+id);

      if (!deletedCostumer) {
        throw new NotFoundException(`Costumer not found`);
      }
    } catch (error) {
      return this.handleErrorResponse(error);
    }
  }

  private handleErrorResponse(error: any) {
    return {
      statusCode: error.status || 500,
      message: error.message || 'Internal Server Error',
      error: error.name || 'Internal Server Error',
    };
  }
}
