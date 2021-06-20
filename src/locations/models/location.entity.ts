import { Column, Entity } from "typeorm";
import { BaseEntity } from '../../base-entity';

@Entity('locations')
export class LocationEntity extends BaseEntity {
    @Column({type: 'varchar', length: 100, nullable: false})
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
    longitude: number;

    @Column("decimal")
    latitude: number;


}