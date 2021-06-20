import { Test, TestingModule } from '@nestjs/testing';
import { LocationsService } from '../services/locations.service';
import { LocationsController } from './locations.controller';

describe('LocationsController', () => {
  let controller: LocationsController;

  const mockLocationService = {
    create: jest.fn(location => {
      return {
        id: Date.now(),
        ...location
      }
    }),
    update: jest.fn().mockImplementation((id, location) => ({
      id,
      ...location
    })),
    calculateDistance: jest.fn((id, location) => {
      return Number;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationsController],
      providers: [LocationsService]
    }).overrideProvider(LocationsService)
      .useValue(mockLocationService)
      .compile();

    controller = module.get<LocationsController>(LocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a location', () => {
    const location = {
      name: 'John',
      description: 'John lake house', 
      phone: '08123324282',
      contact_person: 'Mrs John',
      longitude: 3.12,
      latitude: 4.15,
    }
    expect(mockLocationService.create(location)).toEqual({
      id: expect.any(Number),
      ...location
    })
  })

  it('should create a location and have length', () => {
    expect(controller.createLocation).toHaveLength
  })

  it('should get all location', () => {
    expect(controller.findAllLocation).toHaveLength
  })

  it('should find a single location', () => {
    expect(controller.findSingleLocation).toHaveLength
  })

  it('should update a location', () => {
    const location = {
      name: 'John',
      description: 'John lake house', 
      phone: '08123324282',
      contact_person: 'Mrs John',
      longitude: 3.12,
      latitude: 4.15,
    };
    expect(mockLocationService.update(1, location)).toEqual({
      id: 1,
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
    expect(mockLocationService.calculateDistance(1, location)).toBeCalled
  })

  
});
