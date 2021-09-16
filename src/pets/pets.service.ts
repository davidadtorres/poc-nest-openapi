import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pet, PetDocument } from './schema/pet.schema';
import { NewPetDto } from './dto/new-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Types } from 'mongoose';
import { DeleteResDto } from './dto/delete-res.dto';
import { ModifResDto } from './dto/modif-res.dto';
import { isNotEmptyObject } from 'class-validator';

@Injectable()
export class PetsService {
  constructor(@InjectModel(Pet.name) private petModel: Model<PetDocument>) {}

  findAll(name: string): Promise<Pet[]> {
    const filter = name ? name : '';
    return this.petModel
      .find({ name: { $regex: filter, $options: 'i' } })
      .exec();
  }

  add(newPetDto: NewPetDto): Promise<Pet> {
    const createdUser = new this.petModel(newPetDto);
    return createdUser.save().catch((err) => {
      throw new BadRequestException('Validation failed: ', err.message);
    });
  }

  modify(id: Types.ObjectId, updatePetDto: UpdatePetDto): Promise<ModifResDto> {
    if (!isNotEmptyObject(updatePetDto)) {
      throw new BadRequestException('Validation failed: empty Request body');
    }

    updatePetDto.updatedAt = new Date();
    return this.petModel.updateOne({ _id: id }, { $set: updatePetDto }).exec();
  }

  del(id: Types.ObjectId): Promise<DeleteResDto> {
    return this.petModel.deleteOne({ _id: id }).exec();
  }
}
