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
        verifyOrder: builder.query({
            query: (order_id) => ({
                url: '/orders/verify-order',
                method: 'POST',
                params: { order_id },

            }),
        }),
        getTodaysSale: builder.query({
            query: () => ({
                url: '/orders/get-today-sale',
                method: 'GET',

            }),
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: '/orders/get-my-orders',
                method: 'GET',

            }),
            providesTags: ['order']
        }),
        getAllOrders: builder.query({
            query: () => ({
                url: '/orders/get-all-orders',
                method: 'GET',
            }),
            providesTags: ['orders']
        }),
        changeStatus: builder.mutation({
            query: (args) => ({
                url: `/orders/change-status/${args.id}`,
                method: 'PATCH',
                body: args.data
            }),
            invalidatesTags: ['orders']
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/orders/delete-order/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['orders']
        }),
    }),
});

export const { usePressOrderMutation, useVerifyOrderQuery, useGetTodaysSaleQuery, useGetMyOrdersQuery, useGetAllOrdersQuery, useChangeStatusMutation,useDeleteOrderMutation } = productManagementApi;