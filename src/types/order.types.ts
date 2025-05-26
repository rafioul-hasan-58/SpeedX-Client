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