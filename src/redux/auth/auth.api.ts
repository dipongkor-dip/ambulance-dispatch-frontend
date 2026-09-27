import { baseApi, type ApiEndpointBuilder } from "../baseApi";
import { clearAccessToken, setAccessToken } from "../../lib/authSession";

interface ApiMessage {
  message: string;
}

interface RegisterUser {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthToken {
  access_token: string;
  token_type: string;
}

interface VerifyOtpPayload {
  email: string;
  otp: string;
}

interface UserProfile {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

interface UpdateProfilePayload {
  firstname?: string;
  lastname?: string;
  email?: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder: ApiEndpointBuilder) => ({
    register: builder.mutation<ApiMessage, RegisterUser>({
      query: (userInfo: RegisterUser) => ({
        url: "/auth/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    login: builder.mutation<AuthToken, LoginCredentials>({
      query: ({ username, password }: LoginCredentials) => ({
        url: "/auth/login",
        method: "POST",
        data: new URLSearchParams({ username, password }),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }),
      transformResponse: (data: AuthToken): AuthToken => {
        setAccessToken(data.access_token);
        return data;
      },
    }),
    sendOTP: builder.mutation<ApiMessage, { email: string }>({
      query: ({ email }: { email: string }) => ({
        url: "/auth/send-otp",
        method: "POST",
        params: { email },
      }),
    }),
    verifyOTP: builder.mutation<ApiMessage, VerifyOtpPayload>({
      query: (payload: VerifyOtpPayload) => ({
        url: "/auth/verify-otp",
        method: "POST",
        data: payload,
      }),
    }),
    resetPassword: builder.mutation<
      ApiMessage,
      { email: string; new_password: string }
    >({
      query: (params: { email: string; new_password: string }) => ({
        url: "/auth/reset-password",
        method: "POST",
        params,
      }),
    }),
    changePassword: builder.mutation<
      ApiMessage,
      { current_password: string; new_password: string }
    >({
      query: (params: { current_password: string; new_password: string }) => ({
        url: "/auth/change-password",
        method: "POST",
        params,
      }),
    }),
    getProfile: builder.query<UserProfile, void>({
      query: () => ({ url: "/users/me" }),
      providesTags: ["USER"],
    }),
    updateProfile: builder.mutation<UserProfile, UpdateProfilePayload>({
      query: (data: UpdateProfilePayload) => ({
        url: "/users/me",
        method: "PUT",
        data,
      }),
      invalidatesTags: ["USER"],
    }),
    deleteMyAccount: builder.mutation<ApiMessage, void>({
      query: () => ({ url: "/users/me", method: "DELETE" }),
      invalidatesTags: ["USER"],
    }),
    logout: builder.mutation<void, void>({
      queryFn: async () => {
        clearAccessToken();
        return { data: undefined };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteMyAccountMutation,
  useLogoutMutation,
} = authApi;
