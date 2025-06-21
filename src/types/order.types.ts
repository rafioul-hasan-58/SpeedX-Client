import { IProduct } from "./product.types";


export interface IOrder {
    _id: string;
    product: {
        name: string;
        price: number
    };
    createdAt: string;
    email: string;
    status: string;
}


export interface IOrderItem {
    _id: string;
    product: IProduct;
    quantity: number;
}

export interface IOrder {
    _id: string;
    items: IOrderItem[];
    status: string;
    contact: number;
    totalPrice: number;
    buyer: string;
    email: string;
    address: string;
    createdAt: string;  // or Date if you're treating as Date
    updatedAt: string;
    __v?: number;
}
