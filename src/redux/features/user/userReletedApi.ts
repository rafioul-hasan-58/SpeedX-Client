import { baseApi } from "../../api/baseApi";
const productManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        pressOrder: builder.mutation({
            query: (orderInfo) => ({
                url: '/orders/add-order',
                method: 'POST',
                body: orderInfo,
            }),
        }),
    }),
});

export const { usePressOrderMutation } = productManagementApi;