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

    signUp: builder.mutation({
      query: (userInfo) => ({
        url: '/users/register',
        method: 'POST',
        body: userInfo,
      }),
    }),

  }),
});

export const { useGoogleLoginMutation, useLoginMutation, useSignUpMutation } = authApi;