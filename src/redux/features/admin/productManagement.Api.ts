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
    }),
    getProductDetails: builder.query({
      query: (id) => ({
        url: `/products/get-product/${id}`,
        method: 'GET',
      }),
    }),
    getAllProducts: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item:TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/products/get-all-products',
          method: 'GET',
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<IProduct[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

  }),
});

export const { useAddProductMutation, useGetAllProductsQuery, useGetProductDetailsQuery } = productManagementApi;