import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { LocationsModule } from '../src/locations/locations.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LocationEntity } from '../src/locations/models/location.entity';

describe('LocationsController (e2e)', () => {
  let app: INestApplication;

  const mockLocations = [{
    name: 'John',
    description: 'John lake house', 
    phone: '08123324282',
    contact_person: 'Mrs John',
    longitude: 3.12,
    latitude: 4.15,
  }];
  const mockLocationsRepository ={
      find: jest.fn().mockResolvedValue({mockLocations}),
      create: jest.fn().mockImplementation(location => location),
      save: jest.fn().mockImplementation(location => Promise.resolve({
      id: Date.now(),
      ...location
      }))
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [LocationsModule],
    }).overrideProvider(getRepositoryToken(LocationEntity)).useValue(mockLocationsRepository).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/locations (GET)', () => {
    return request(app.getHttpServer())
      .get('/locations')
      .expect(200);
  });

  it('/locations (POST)', () => {
    const location = {
        name: 'John',
        description: 'John lake house', 
        phone: '08123324282',
        contact_person: 'Mrs John',
        longitude: 3.12,
        latitude: 4.15,
      }
    return request(app.getHttpServer())
      .post('/locations')
      .send(location)
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
          expect(response.body).toEqual({
              id: expect.any(Number),
              ...location
          })
      })
  });

  it('/distance/id (GET)', () => {
    return request(app.getHttpServer())
      .get('/locations')
      .expect(200);
  });
});
