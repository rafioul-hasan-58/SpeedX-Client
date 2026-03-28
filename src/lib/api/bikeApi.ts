// bikeManagementApi.ts
import { API_ENDPOINTS } from "@/config/api";
import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "@/types/global";
import { IProduct } from "@/types/product.types";

const bikeManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        addBike: builder.mutation({
            query: (userInfo) => ({
                url: API_ENDPOINTS.BIKES.ADD_BIKE,
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
                    url: API_ENDPOINTS.BIKES.GET_ALL_BIKES,
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
                url: API_ENDPOINTS.BIKES.GET_BIKE_DETAILS(id),
                method: 'GET',
            }),
            providesTags: ['productInfo'],
        }),

        getMyAddedBikes: builder.query({
            query: () => ({
                url: API_ENDPOINTS.BIKES.GET_MY_BIKES,
                method: 'GET',
            }),
        }),

        getAvailableStocks: builder.query({
            query: () => ({
                url: API_ENDPOINTS.BIKES.GET_AVAILABLE_STOCKS,
                method: 'GET',
            }),
        }),

        updateBike: builder.mutation({
            query: (args) => ({
                url: API_ENDPOINTS.BIKES.UPDATE_BIKE(args.id),
                method: 'PATCH',
                body: args.data,
            }),
            invalidatesTags: ['product'],
        }),

        removeBike: builder.mutation({
            query: (id) => ({
                url: API_ENDPOINTS.BIKES.DELETE_BIKE(id),
                method: 'DELETE',
            }),
            invalidatesTags: ['product'],
        }),

        removeBikeImage: builder.mutation({
            query: (args) => ({
                url: API_ENDPOINTS.BIKES.REMOVE_BIKE_IMAGE(args.id),
                method: 'PATCH',
                body: args.data,
            }),
            invalidatesTags: ['productInfo'],
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