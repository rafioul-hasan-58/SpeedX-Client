import { API_ENDPOINTS } from "@/config/api";
import { baseApi } from "@/redux/api/baseApi";

export interface ICreateChatRoomPayload {
    createdBy: string;
    participantId: string;
}

export interface IJoinChatRoomPayload {
    roomId: string;
    userId: string;
}

export interface ISendChatMessagePayload {
    receiverId: string;
    message: string;
}

export const chatApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createChatRoom: builder.mutation<unknown, ICreateChatRoomPayload>({
            query: (body) => ({
                url: API_ENDPOINTS.CHAT.CREATE_ROOM,
                method: "POST",
                body,
            }),
        }),
        joinChatRoom: builder.mutation<unknown, IJoinChatRoomPayload>({
            query: (body) => ({
                url: API_ENDPOINTS.CHAT.JOIN_ROOM,
                method: "POST",
                body,
            }),
        }),
        sendChatMessage: builder.mutation<unknown, ISendChatMessagePayload>({
            query: (body) => ({
                url: API_ENDPOINTS.CHAT.SEND_MESSAGE,
                method: "POST",
                body,
            }),
        }),
    }),
});

export const {
    useCreateChatRoomMutation,
    useJoinChatRoomMutation,
    useSendChatMessageMutation,
} = chatApi;
