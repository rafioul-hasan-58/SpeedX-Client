import { API_ENDPOINTS } from "@/config/api";
import { baseApi } from "@/redux/api/baseApi";
import { CreateStorePayload, StoreResponse } from "@/types/store/store.types";

export const storeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createStore: builder.mutation<StoreResponse, CreateStorePayload>({
            query: (payload) => ({
                url: API_ENDPOINTS.STORE.CREATE,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["profile"]
        }),

    }),
});

export const {
    useCreateStoreMutation
} = storeApi;
