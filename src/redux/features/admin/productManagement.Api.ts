import { TQueryParam, TResponseRedux } from "../../../types/global";
import { IProduct } from "../../../types/product.types";
import { baseApi } from "../../api/baseApi";

const productManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    addProduct: builder.mutation({
      query: (userInfo) => ({
        url: '/products/add-product',
        method: 'POST',
        body: userInfo,
      }),
      invalidatesTags: ['product']
    }),

    getProductDetails: builder.query({
      query: (id) => ({
        url: `/products/get-product/${id}`,
        method: 'GET',
      }),
    }),

    getAvailableStocks: builder.query({
      query: () => ({
        url: `/products/get-available-stocks`,
        method: 'GET',
      }),
    }),
    
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
    updateProduct: builder.mutation({
      query: (args) => ({
        url: `/products/update-product/${args.id}`,
        method: 'PATCH',
        body: args.data
      }),
      invalidatesTags: ['product']
    }),
    
    removeProduct: builder.mutation({
      query: (id) => ({
        url: `/products/delete-product/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['product']
    }),
  }),
});

export const { useAddProductMutation, useGetAllProductsQuery, useGetProductDetailsQuery, useRemoveProductMutation, useUpdateProductMutation,useGetAvailableStocksQuery } = productManagementApi;