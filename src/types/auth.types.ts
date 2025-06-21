export interface IUser {
    email?: string;
    exp?: number;
    iat?: number;
    role: 'admin' | 'customer' | undefined;
};

export type TUser = {
    _id: string;
    image?: string;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'customer';
    isBlocked: boolean;
}
export interface IMyProfile {
    _id: string;
    name: string;
    email: string;
    image: string;
    password: string;
    role: 'customer' | 'admin'
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
