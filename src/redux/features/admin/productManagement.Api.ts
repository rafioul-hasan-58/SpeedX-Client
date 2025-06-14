
import { baseApi } from "../../api/baseApi";

const productManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableStocks: builder.query({
      query: () => ({
        url: `/products/get-available-stocks`,
        method: 'GET',
      }),
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

export const { useRemoveProductMutation, useUpdateProductMutation, useGetAvailableStocksQuery } = productManagementApi;