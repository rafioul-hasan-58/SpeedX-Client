import { IChangePassword } from '@/types/auth.types';
import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    googleLogin: builder.mutation({
      query: (token: string) => ({
        url: '/auth/google-login',
        method: 'POST',
        body: { token },
      }),
    }),

    login: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/login',
        method: 'POST',
        body: userInfo,
      }),
    }),
    changePassword: builder.mutation<void, IChangePassword>({
      query: (bodyData) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: bodyData,
      }),
    }),

    signUp: builder.mutation({
      query: (userInfo) => ({
        url: '/users/register',
        method: 'POST',
        body: userInfo,
      }),
    }),

  }),
});

export const {
  useGoogleLoginMutation,
  useChangePasswordMutation,
  useLoginMutation,
  useSignUpMutation
} = authApi;