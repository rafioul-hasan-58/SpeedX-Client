import { baseApi } from "../../api/baseApi";
const userReletedApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyProfile: builder.query({
            query: (email) => {
                return {
                    url: `/users/get-profile/${email}`,
                    method: 'GET',
                }
            },
            providesTags: ['profile']
        }),
        updateProfile: builder.mutation({
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
    = userReletedApi;