import { IProduct } from "./product.types";



export interface IOrderItem {
    _id: string;
    product: IProduct;
    quantity: number;
}

export interface IOrder {
    _id: string;
    items: IOrderItem[];
    status: "Pending" | "Delivered" | "Cancelled";
    contact: number;
    totalPrice: number;
    buyer: string;
    email: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
}
