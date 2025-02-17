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
            transformResponse: (response: TResponseRedux<TUser[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        getMyProfile: builder.query({
            query: (email) => {
                return {
                    url: `/users/get-profile/${email}`,
                    method: 'GET',
                }
            }
        }),
        updateProfile: builder.mutation({
            query: (args) => {
                return {
                    url: `/users/update/${args.id}`,
                    method: 'PATCH',
                    body: args.data
                }
            }
        }),
    }),
});

export const { useGetAllUsersQuery, useGetMyProfileQuery, useUpdateProfileMutation } = usersManagementApi;