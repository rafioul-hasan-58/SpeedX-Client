import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        removeProductImage: builder.mutation({
            query: (args) => ({
                url: `products/remove-product-image/${args.id}`,
                method: 'PATCH',
                body: args.data,
            }),
            invalidatesTags: ['product']
        }),
        addProduct: builder.mutation({
            query: (userInfo) => ({
                url: '/products/add-product',
                method: 'POST',
                body: userInfo,
            }),
        }),

        getProductDetails: builder.query({
            query: (id) => ({
                url: `/products/get-product/${id}`,
                method: 'GET',
            }),
        }),


    }),
});

export const { useRemoveProductImageMutation,useAddProductMutation,useGetProductDetailsQuery } = authApi;