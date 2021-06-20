import { IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity } from "typeorm";
import { BaseEntity } from '../../base-entity';


@Entity('locations')
export class LocationEntity extends BaseEntity {
    @Column({type: 'varchar', length: 100, nullable: false})
    @MinLength(2, {
        message: 'Name is too short, min length is 2',
      })
    name: string;

    @Column({type: 'text', nullable: false})
    description: string;

    @Column({type: 'varchar', nullable: true})
    website: string;

    @Column({type: 'varchar', length: 200, nullable: false})
    phone: string;

    @Column({type: 'varchar', nullable: false})
    contact_person: string;

    @Column("decimal")
    @IsNotEmpty({message: 'Longitude is required'})
    longitude: number;

    @Column("decimal")
    @IsNotEmpty({message: 'Latitude is required'})
    latitude: number;


}