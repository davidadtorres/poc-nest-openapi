import { PartialType, IntersectionType } from '@nestjs/swagger';
import { NewPetDto } from './new-pet.dto';

class PetDate {
  updatedAt?: Date;
}

export class UpdatePet extends PartialType(NewPetDto) {}

export class UpdatePetDto extends IntersectionType(UpdatePet, PetDate) {}
