export interface IUser {
    email?: string;
    exp?: number;
    iat?: number;
    role: 'admin' | 'customer' | undefined;
};

export type TUser = {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'customer';
    isBlocked: boolean;
}
