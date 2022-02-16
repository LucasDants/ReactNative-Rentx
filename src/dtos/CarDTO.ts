export interface CarDTO {
    id: string;
    name: string;
    brand: string;
    about: string;
    rent: {
        period: string;
        price: number
    }
    fuel_type: string;
    thumbnail: string;
    accessories: {
        type: string;
        name: string;
    }[];
    photos: string[]
}