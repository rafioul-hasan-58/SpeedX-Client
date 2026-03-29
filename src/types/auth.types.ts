export interface IUser {
    email: string;
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

// auth types
export interface IRegisterPayload {
    fullName: string;
    email: string;
    password: string;
}
// verify-otp
export type VerifyOTPPayload = {
    otp: string;
    email: string;
};
export type VerifyOTPResponse = {
    message: string;
    success: boolean;
};
// verify forgot password otp
export type VerifyForgotPasswordOTPPayload = {
    otp: number;
    email: string;
};
export type VerifyForgotPasswordOTPResponse = {
    message: string;
    success: boolean;
    statusCode: number;
    data: {
        accessToken: string
    }
};

// forget-password
export type ForgetPasswordPayload = {
    email: string;
};

export type ForgetPasswordResponse = {
    message: string;
    success: boolean;
    statusCode: number;
    data: {
        message: string
    }
};

// reset-password
export type ResetPasswordPayload = {
    newPassword: string;
    confirmPassword: string;
    email: string
};
export type ResetPasswordResponse = {
    message: string;
    success: boolean;
};

// resend-otp
export type ResendOtpPayload = {
    email: string;
};
export type ResendOtpResponse = {
    message: string;
    success: boolean;
};