export interface Location {
    id?: number;
    name: string;
    description: string;    
    website?: string;
    phone: string;
    contact_person: string;
    longitude: number;
    latitude: number;
    createdAt?: Date;
    updatedAt?: Date;
}