import { Body, Controller, Post, Put, Param, Get, Delete } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Location } from '../models/location.interface';
import { LocationsService } from '../services/locations.service';

@Controller('locations')
export class LocationsController {
    constructor(private readonly locationsService: LocationsService){}

    @Post()
    createLocation(@Body() location: Location): Observable<Location> {
        return this.locationsService.createLocation(location)
    }

    @Get()
    findAllLocation(): Observable<Location[]>{
        return this.locationsService.getAllLocation();
    }

    @Get(':id')
    findSingleLocation(@Param('id') id: number): Observable<Location>{
        return this.locationsService.getSingleLocation(id);
    }

    @Put(':id')
    updateLocation(@Body() location: Location, @Param('id') id: number): Observable<UpdateResult> {
        return this.locationsService.updateLocation(id, location)
    }

    @Delete(':id')
    deleteLocation(@Param('id') id: number): Observable<DeleteResult> {
        return this.locationsService.deleteLocation(id);
    }

    @Get('distance/:id')
    calculateLocationDistance(@Param('id') id: number, @Body() location: Location): Promise<number> {
        return this.locationsService.calculateLocationDistance(id, location);
    }
}
