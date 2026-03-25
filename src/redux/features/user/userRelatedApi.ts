import { TProfileResponse } from "@/types/user.types";
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
        updateProfile: builder.mutation<TProfileResponse, FormData>({
            query: (formData) => {
                return {
                    url: `/users/update-profile`,
                    method: 'PATCH',
                    body: formData
                }
            },
            invalidatesTags: ['profile']
        }),
        chatBot: builder.mutation({
            query: (body) => ({
                url: `/chatbot/chat`,
                method: 'POST',
                body,
            }),
        }),

    }),
});

export const {
    useGetMyProfileQuery,
    useUpdateProfileMutation,
    useChatBotMutation
}
    = userRelatedApi;