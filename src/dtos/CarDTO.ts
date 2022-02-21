export interface CarDTO {
    id: string;
    name: string;
    brand: string;
    about: string;

    period: string;
    price: number
    
    fuel_type: string;
    thumbnail: string;
    accessories: {
        id: string
        type: string;
        name: string;
    }[];
    photos: {
        id: string;
        photo: string
    }[]
}