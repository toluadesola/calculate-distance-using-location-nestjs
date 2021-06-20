import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LocationEntity } from '../models/location.entity';
import { LocationsService } from './locations.service';

describe('LocationsService', () => {
  let service: LocationsService;

  const mockLocationsRepository ={
    create: jest.fn().mockImplementation(location => location),
    save: jest.fn().mockImplementation(location => Promise.resolve({
      id: Date.now(),
      ...location
    })),
    calculateDistance: jest.fn((id, location) => {
      return Number;
    }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationsService, {
        provide: getRepositoryToken(LocationEntity),
        useValue: mockLocationsRepository
      }],
    }).compile();

    service = module.get<LocationsService>(LocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new location object', async () => {
    const location = {
      name: 'John',
      description: 'John lake house', 
      phone: '08123324282',
      contact_person: 'Mrs John',
      longitude: 3.12,
      latitude: 4.15,
    }
    expect(await mockLocationsRepository.save(location)).toEqual({
      id: expect.any(Number),
      ...location
    })
  })

  it('should calculate distance', () => {
    distance: Number;
    const location = {
      name: 'John',
      description: 'John lake house', 
      phone: '08123324282',
      contact_person: 'Mrs John',
      longitude: 3.12,
      latitude: 4.15,
    };
    expect(mockLocationsRepository.calculateDistance(1, location)).toBeCalled
  })
});
