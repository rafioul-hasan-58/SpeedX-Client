export interface IUser {
    email?: string;
    exp?: number;
    iat?: number;
    activeRole: 'admin' | 'customer' | undefined;
};

export type TUser = {
    _id: string;
    image: string;
    name: string;
    email: string;
    password: string;
    activeRole: 'admin' | 'customer';
    isBlocked: boolean;
}
export interface IMyProfile {
    _id: string;
    name: string;
    email: string;
    image: string;
    password: string;
    activeRole: 'customer' | 'admin'
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
