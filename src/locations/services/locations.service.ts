import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { LocationEntity } from '../models/location.entity';
import { Location } from '../models/location.interface';

@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(LocationEntity)
        private readonly locationRepository: Repository<LocationEntity>
    ){}

    createLocation(location: Location): Observable<Location> {
        return from(this.locationRepository.save(location));
    }

    getAllLocation(): Observable<Location[]> {
        return from(this.locationRepository.find());
    }

    getSingleLocation(id: number): Observable<Location> {
        return from(this.locationRepository.findOne(id));
    }

    updateLocation(id: number, location: Location): Observable<UpdateResult> {
        return from(this.locationRepository.update(id, location));
    }

    deleteLocation(id: number): Observable<DeleteResult> {
        return from(this.locationRepository.delete(id));
    }

    async calculateLocationDistance(id: number, location: Location): Promise<number>{
        const ourLocation = await this.locationRepository.findOne(id);

        var radius = 6371; // Radius of the earth in km
        var distanceInLatitude = this.deg2rad(ourLocation.latitude - location.latitude);  // deg2rad below
        var distanceInLongitude = this.deg2rad(ourLocation.longitude - location.latitude); 
        var a = 
            Math.sin(distanceInLatitude/2) * Math.sin(distanceInLatitude/2) +
            Math.cos(this.deg2rad(ourLocation.latitude)) * Math.cos(this.deg2rad(location.latitude)) * 
            Math.sin(distanceInLongitude/2) * Math.sin(distanceInLongitude/2)
            ; 
        var distance = 2 * radius * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        return distance;
    }

    deg2rad(deg: number): number {
        return deg * (Math.PI/180);
    }


}
