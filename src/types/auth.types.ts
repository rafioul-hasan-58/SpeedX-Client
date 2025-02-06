export interface IUser {
    email?: string;
    exp?: number;
    iat?: number;
    role: 'admin' | 'customer' | undefined;
};

