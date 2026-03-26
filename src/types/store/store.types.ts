// Request payload
export interface CreateStorePayload {
    storeName: string;
    description: string;
    address?: string | null;
    phone?: string | null;
    logo?: string | null;
}

// The data object inside response
export interface StoreData {
    _id: string;
    owner: string;
    storeName: string;
    description: string;
    address: string;
    phone: string;
    isActive: boolean;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

// Full API response wrapper
export interface StoreResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: StoreData;
}