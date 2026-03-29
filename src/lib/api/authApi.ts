import { API_ENDPOINTS } from "@/config/api";
import { baseApi } from "@/redux/api/baseApi";
import { ForgetPasswordPayload, ForgetPasswordResponse, ResendOtpPayload, ResendOtpResponse, ResetPasswordPayload, ResetPasswordResponse, VerifyForgotPasswordOTPPayload, VerifyForgotPasswordOTPResponse, VerifyOTPPayload, VerifyOTPResponse } from "@/types/auth.types";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // POST /verify-otp
        verifyOTP: builder.mutation<VerifyOTPResponse, VerifyOTPPayload>({
            query: (payload) => ({
                url: API_ENDPOINTS.AUTH.VERIFY_OTP,
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["profile"],
        }),
        // POST /verify-otp
        verifyForgotPasswordOTP: builder.mutation<VerifyForgotPasswordOTPResponse, VerifyForgotPasswordOTPPayload>({
            query: (payload) => ({
                url: API_ENDPOINTS.AUTH.VERIFY_FORGOT_PASSWORD_OTP,
                method: "POST",
                body: payload,
            }),
        }),

        // POST /forget-password
        forgotPassword: builder.mutation<ForgetPasswordResponse, ForgetPasswordPayload>({
            query: (payload) => ({
                url: API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
                method: "POST",
                body: payload,
            }),
        }),

        // POST /reset-password
        resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordPayload>({
            query: ({ newPassword, confirmPassword, email }) => ({
                url: API_ENDPOINTS.AUTH.RESET_PASSWORD,
                method: "POST",
                body: { newPassword, confirmPassword, email }
            }),
        }),

        // POST /resend-otp
        resendOtp: builder.mutation<ResendOtpResponse, ResendOtpPayload>({
            query: (payload) => ({
                url: API_ENDPOINTS.AUTH.RESEND_OTP,
                method: "POST",
                body: payload,
            }),
        }),

    }),
});

export const {
    useVerifyOTPMutation,
    useForgotPasswordMutation,
    useVerifyForgotPasswordOTPMutation,
    useResetPasswordMutation,
    useResendOtpMutation,
} = authApi;