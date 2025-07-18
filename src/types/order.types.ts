import { TUser } from "./auth.types";
import { IProduct } from "./product.types";



export interface IOrderItem {
    _id: string;
    product: IProduct;
    quantity: number;
}

export interface IOrder {
    _id: string;
    items: IOrderItem[];
    status: "Pending" | "Delivered" | "Cancelled" | "Processing" | "Shipped" | "Returned";
    contact: number;
    totalPrice: number;
    buyer: TUser;
    email: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
}
