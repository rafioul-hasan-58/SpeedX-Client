import { TUser } from "../../../types/auth.types";
import { TQueryParam, TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";
const usersManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: (args) => {
                console.log(args);
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: `/users/get-all-users`,
                    method: 'GET',
                    params: params,
                };
            },
            providesTags: ['user'],
            transformResponse: (response: TResponseRedux<TUser[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        deleteUser: builder.mutation({
            query: (id) => {
                return {
                    url: `/users/delete/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['user']
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useDeleteUserMutation
} = usersManagementApi;