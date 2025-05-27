

export interface IProduct {
    _id: string;
    name: string;
    color: string;
    brandName: string;
    price: number;
    description: string;
    model: string;
    stocks: number;
    images: string[];
    instock?: boolean;
    type: "new" | "used";
    bikeType: string;
}
