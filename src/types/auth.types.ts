export interface IUser {
    email?: string;
    exp?: number;
    iat?: number;
    activeRole: 'admin' | 'customer' | undefined;
};

export type TUser = {
    _id: string;
    profileImage: string;
    fullName: string;
    email: string;
    password: string;
    activeRole: 'admin' | 'customer';
    isBlocked: boolean;
}
export interface IMyProfile {
    _id: string;
    fullName: string;
    email: string;
    profileImage: string;
    password: string;
    activeRole: 'customer' | 'admin'
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export interface IChangePassword {
    newPassword: string;
    oldPassword: string;
};