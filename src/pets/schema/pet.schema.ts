import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type PetDocument = Pet & Document;

@Schema({ autoCreate: true })
export class Pet {
  @ApiProperty({
    description: 'Creation date of the pet',
    required: true,
    default: new Date(),
  })
  @Prop({ type: Date, default: new Date(), required: true })
  createdAt: Date;

  @ApiProperty({
    description: 'Modification date of the pet',
    required: false,
  })
  @Prop({ type: Date, required: false })
  updatedAt?: Date;

  @ApiProperty({
    description: 'Unique code of the pet chip',
    required: true,
  })
  @Prop({ index: true, unique: true, required: true })
  chipCode: string;

  @ApiProperty({
    description: 'Name of the pet',
    required: true,
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'Breed of the pet',
    required: true,
  })
  @Prop({ required: true })
  breed: string;

  @ApiProperty({
    description: 'Age of the pet',
    required: false,
  })
  @Prop({ required: false })
  age?: number;

  @ApiProperty({
    description: 'List of pet owners',
    required: false,
  })
  @Prop({ type: Array, required: false })
  owners?: string[];

  @ApiProperty({
    description: 'If the pet is missing',
    required: true,
  })
  @Prop({ required: true })
  isLost: boolean;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
