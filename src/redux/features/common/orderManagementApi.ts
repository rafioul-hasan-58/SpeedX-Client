import { IOrder } from "@/types/order.types";
import { baseApi } from "../../api/baseApi";
import { TQueryParam, TResponseRedux } from "@/types/global";
const orderManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // This endpoint is used to place an order
        pressOrder: builder.mutation({
            query: (orderInfo) => ({
                url: '/orders/add-order',
                method: 'POST',
                body: orderInfo,
            }),
        }),
        // This endpoint is used to verify an order
        verifyOrder: builder.query({
            query: (order_id) => ({
                url: '/orders/verify-order',
                method: 'POST',
                params: { order_id },

            }),
        }),
        // This endpoint is used to get today's sale and total sale
        getTodaysSale: builder.query({
            query: () => ({
                url: '/orders/get-today-sale',
                method: 'GET',

            }),
        }),
        getTotalSale: builder.query({
            query: () => ({
                url: '/orders/get-total-sale',
                method: 'GET',

            }),
        }),
        // This endpoint is used to get all orders of the user
        getMyOrders: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }
                return {
                    url: '/orders/get-my-orders',
                    method: 'GET',
                    params: params,
                };
            },
            providesTags: ['order'],
            transformResponse: (response: TResponseRedux<IOrder[]>) => {
                return response
            },
        }),
        getAllOrders: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }
                return {
                    url: '/orders/get-all-orders',
                    method: 'GET',
                    params: params,
                };
            },
            providesTags: ['orders'],
            transformResponse: (response: TResponseRedux<IOrder[]>) => {
                return response
            },
        }),
        // This endpoint is used to change the status of an order
        changeStatus: builder.mutation({
            query: (args) => ({
                url: `/orders/change-status/${args.id}`,
                method: 'PATCH',
                body: args.data
            }),
            invalidatesTags: ['orders', 'order']
        }),
        // This endpoint is used to delete an order
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/orders/delete-order/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['orders']
        }),
    }),
});

export const {
    usePressOrderMutation,
    useVerifyOrderQuery,
    useGetAllOrdersQuery,
    useGetTotalSaleQuery,
    useGetTodaysSaleQuery,
    useGetMyOrdersQuery,
    useChangeStatusMutation,
    useDeleteOrderMutation,

}
    = orderManagementApi;