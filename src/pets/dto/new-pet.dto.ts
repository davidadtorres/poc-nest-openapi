import {
  IsArray,
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
  ArrayNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewPetDto {
  @ApiProperty({
    description: 'Unique code of the pet chip',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  chipCode: string;

  @ApiProperty({
    description: 'Name of the pet',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Breed of the pet',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  breed: string;

  @ApiProperty({
    description: 'Age of the pet',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiProperty({
    description: 'List of pet owners',
    required: false,
  })
  @IsOptional()
  @ArrayNotEmpty()
  @IsArray()
  owners?: string[];

  @ApiProperty({
    description: 'If the pet is missing',
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  isLost: boolean;
}
