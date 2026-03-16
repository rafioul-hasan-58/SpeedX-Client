import { TProfileResponse, TUpdateProfileArgs } from "@/types/user.types";
import { baseApi } from "../../api/baseApi";
const userRelatedApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyProfile: builder.query<TProfileResponse, void>({
            query: () => ({
                url: `/users/my-profile`,
                method: "GET",
            }),
            providesTags: ["profile"],
        }),
        updateProfile: builder.mutation<TProfileResponse, TUpdateProfileArgs>({
            query: (args) => {
                return {
                    url: `/users/update/${args.id}`,
                    method: 'PATCH',
                    body: args.data
                }
            },
            invalidatesTags: ['profile']
        }),

    }),
});

export const {
    useGetMyProfileQuery,
    useUpdateProfileMutation
}
    = userRelatedApi;