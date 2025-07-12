
import { TQueryParam, TResponseRedux } from "@/types/global";
import { baseApi } from "../../api/baseApi";
import { IProduct } from "@/types/product.types";

const bikeManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        addBike: builder.mutation({
            query: (userInfo) => ({
                url: '/products/add-product',
                method: 'POST',
                body: userInfo,
            }),
        }),

        getAllBikes: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }
                return {
                    url: '/products/get-all-products',
                    method: 'GET',
                    params: params,
                };
            },
            providesTags: ['product'],
            transformResponse: (response: TResponseRedux<IProduct[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        getBikeDetails: builder.query({
            query: (id) => ({
                url: `/products/get-product/${id}`,
                method: 'GET',
            }),
            providesTags: ['productInfo']
        }),
        // This endpoint is used to get products added by the user
        getMyAddedBikes: builder.query({
            query: (id) => ({
                url: `/products/get-my-added-products/${id}`,
                method: 'GET',
            }),
        }),
        getAvailableStocks: builder.query({
            query: () => ({
                url: `/products/get-available-stocks`,
                method: 'GET',
            }),
        }),

        updateBike: builder.mutation({
            query: (args) => ({
                url: `/products/update-product/${args.id}`,
                method: 'PATCH',
                body: args.data
            }),
            invalidatesTags: ['product']
        }),

        removeBike: builder.mutation({
            query: (id) => ({
                url: `/products/delete-product/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['product']
        }),
        removeBikeImage: builder.mutation({
            query: (args) => ({
                url: `products/remove-product-image/${args.id}`,
                method: 'PATCH',
                body: args.data,
            }),
            invalidatesTags: ['productInfo']
        }),
    }),
});

export const {
    useAddBikeMutation,
    useGetAllBikesQuery,
    useGetBikeDetailsQuery,
    useGetMyAddedBikesQuery,
    useUpdateBikeMutation,
    useRemoveBikeMutation,
    useRemoveBikeImageMutation,
    useGetAvailableStocksQuery,

} = bikeManagementApi;