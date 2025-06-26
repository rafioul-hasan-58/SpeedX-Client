import { IProduct } from '@/types/product.types';
import { baseApi } from '../../api/baseApi';
import { TQueryParam, TResponseRedux } from '@/types/global';

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
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

        getProductDetails: builder.query({
            query: (id) => ({
                url: `/products/get-product/${id}`,
                method: 'GET',
            }),
            providesTags: ['productInfo']
        }),

        removeProductImage: builder.mutation({
            query: (args) => ({
                url: `products/remove-product-image/${args.id}`,
                method: 'PATCH',
                body: args.data,
            }),
            invalidatesTags: ['productInfo']
        }),

        addProduct: builder.mutation({
            query: (userInfo) => ({
                url: '/products/add-product',
                method: 'POST',
                body: userInfo,
            }),
        }),




    }),
});

export const {
    useGetAllProductsQuery,
    useRemoveProductImageMutation,
    useAddProductMutation,
    useGetProductDetailsQuery
} = authApi;