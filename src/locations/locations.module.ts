import { Module } from '@nestjs/common';
import { LocationsController } from './controllers/locations.controller';
import { LocationsService } from './services/locations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationEntity } from './models/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocationEntity])],
  controllers: [LocationsController],
  providers: [LocationsService]
})
export class LocationsModule {}
