import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { NewPetDto } from '../src/pets/dto/new-pet.dto';
import { UpdatePetDto } from './../src/pets/dto/update-pet.dto';

describe('AppController (e2e)', () => {
  const newPetDto: NewPetDto = {
    chipCode: '11111136',
    name: 'Rosalía',
    breed: 'Pastor Alemán',
    age: 9,
    isLost: true,
  };

  const updatePetDto: UpdatePetDto = {
    name: 'Rosa',
  };

  const pet = {
    __v: 0,
    _id: expect.stringMatching(/[A-Za-z:0-9-\.]+/),
    age: 9,
    breed: 'Pastor Alemán',
    chipCode: '11111136',
    createdAt: expect.stringMatching(/[A-Za-z:0-9-\.]+/),
    isLost: true,
    name: 'Rosalía',
  };

  const modRes = {
    acknowledged: true,
    matchedCount: 1,
    modifiedCount: 1,
    upsertedCount: 0,
    upsertedId: null,
  };

  const delRes = {
    deletedCount: 1,
  };

  let app: INestApplication;
  let petId;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /api/pets', () => {
    return request(app.getHttpServer())
      .post('/pets')
      .set('Accept', 'application/json')
      .send(newPetDto)
      .expect(201)
      .expect('Content-Type', /json/)
      .then((res) => {
        petId = res.body._id;
        expect(res.body).toMatchObject(pet);
      });
  });

  it('GET /api/pets', () => {
    return request(app.getHttpServer())
      .get('/pets')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toEqual(expect.arrayContaining([pet]));
      });
  });

  it('PUT /api/pets/{id}', () => {
    return request(app.getHttpServer())
      .put(`/pets/${petId}`)
      .set('Accept', 'application/json')
      .send(updatePetDto)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toMatchObject(modRes);
      });
  });

  it('DELETE /api/pets/{id}', () => {
    return request(app.getHttpServer())
      .delete(`/pets/${petId}`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toMatchObject(delRes);
      });
  });
});
