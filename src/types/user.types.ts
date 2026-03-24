export type TUserProfile = {
    _id: string;
    fullName: string;
    email: string;
    phone?: string;
    bio?: string;
    profileImage?: string;
    location?: string;
    roles?: string[];
    activeRole: 'customer' | 'admin' | 'seller';
    isBlocked: boolean;


};
export type TProfileResponse = {
    success: boolean;
    data: TUserProfile;
};
export type TUpdateProfileArgs = {
    id: string;
    data: Partial<TUserProfile>;
};