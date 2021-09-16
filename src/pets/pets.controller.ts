import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import {
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiOperation,
} from '@nestjs/swagger';
import { NewPetDto } from './dto/new-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './schema/pet.schema';
import { Types } from 'mongoose';
import { ParseIDPipe } from './pipe/parse-id.pipe';
import { DeleteResDto } from './dto/delete-res.dto';
import { ModifResDto } from './dto/modif-res.dto';

@ApiTags('pets')
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all pet data' })
  @ApiQuery({
    name: 'name',
    description: 'Pet name',
    type: String,
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Pets retrieved',
    type: Pet,
    isArray: true,
  })
  findAll(@Query('name') name: string) {
    return this.petsService.findAll(name);
  }

  @Post()
  @ApiOperation({ summary: 'Add new pet' })
  @ApiBody({ type: NewPetDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'New pet added successfully',
    type: Pet,
  })
  create(@Body() newPetDto: NewPetDto) {
    return this.petsService.add(newPetDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a pet' })
  @ApiParam({ name: 'id', description: 'Pet ID', type: String })
  @ApiBody({ type: UpdatePetDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Pet modified successfully',
    type: ModifResDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Pet doesn't found",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation failed: invalid ID',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation failed: empty Request body',
  })
  update(
    @Param('id', ParseIDPipe) id: Types.ObjectId,
    @Body() updatePetDto: UpdatePetDto,
  ) {
    return this.petsService.modify(id, updatePetDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a pet' })
  @ApiParam({ name: 'id', description: 'Pet ID', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Pet deleted successfully',
    type: DeleteResDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Pet doesn't found",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation failed: invalid ID',
  })
  remove(@Param('id', ParseIDPipe) id: Types.ObjectId) {
    return this.petsService.del(id);
  }
}
