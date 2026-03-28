export interface IUser {
    email?: string;
    fullName: string;
    exp?: number;
    iat?: number;
    activeRole: 'ADMIN' | 'CUSTOMER' | 'SELLER' | undefined;
};

export type TUser = {
    _id: string;
    profileImage: string;
    fullName: string;
    email: string;
    password: string;
    activeRole: 'ADMIN' | 'CUSTOMER' | 'SELLER';
    isBlocked: boolean;
}
export interface IMyProfile {
    _id: string;
    fullName: string;
    email: string;
    profileImage: string;
    password: string;
    activeRole: 'ADMIN' | 'CUSTOMER' | 'SELLER'
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export interface IChangePassword {
    newPassword: string;
    oldPassword: string;
};

export interface IRegisterPayload {
    fullName: string;
    email: string;
    password: string;
}