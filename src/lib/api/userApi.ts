import { API_ENDPOINTS } from "@/config/api";
import { baseApi } from "@/redux/api/baseApi";
import { TProfileResponse } from "@/types/user.types";

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
        addRole: builder.mutation({
            query: () => ({
                url: API_ENDPOINTS.USER.ADD_ROLE,
                method: 'POST',
            }),
            invalidatesTags: ['profile']
        }),
        getChatHistory: builder.query({
            query: () => ({
                url: API_ENDPOINTS.CHATBOT.HISTORY,
                method: 'GET',
            }),
        }),
        clearChatHistory: builder.mutation({
            query: () => ({
                url: API_ENDPOINTS.CHATBOT.CLEAR,
                method: 'DELETE',
            }),
        }),
        switchRole: builder.mutation({
            query: () => ({
                url: API_ENDPOINTS.USER.SWITCH_ROLE,
                method: 'POST',
            }),
            invalidatesTags: ['profile']
        }),

    }),
});

export const {
    useGetMyProfileQuery,
    useUpdateProfileMutation,
    useChatBotMutation,
    useAddRoleMutation,
    useGetChatHistoryQuery,
    useClearChatHistoryMutation,
    useSwitchRoleMutation
}
    = userRelatedApi;