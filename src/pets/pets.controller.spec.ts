import { Test, TestingModule } from '@nestjs/testing';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { NewPetDto } from './dto/new-pet.dto';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Pet, PetSchema } from './schema/pet.schema';

describe('PetsController', () => {
  let petsController: PetsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DB_URI),
        MongooseModule.forFeature([
          {
            name: Pet.name,
            schema: PetSchema,
          },
        ]),
      ],
      controllers: [PetsController],
      providers: [PetsService],
    }).compile();

    petsController = app.get<PetsController>(PetsController);
  });

  describe('root', () => {
    it('should create a new pet', async () => {
      const newPetDto: NewPetDto = {
        chipCode: '11111126',
        name: 'Rosalía',
        breed: 'Pastor Alemán',
        isLost: true,
      };
      await expect(petsController.create(newPetDto)).resolves.toMatchObject(
        newPetDto,
      );
    });
  });
});
