import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryApp } from './baseQuery';
import { extractRehydrationInfo, keepUnusedDataFor } from './helpers';
import type {
  IAuthResult,
  ILoginParams,
  IRegisterParams,
  IResetPasswordParams,
  ILoginWeb3Params,
} from './apiTypes';
import { APP_ROUTE } from './routes';
import type { IResetPasswordOtpParams } from './apiTypes';
import { syncStorage } from '../helpers/syncStorage';
import { clearDatabases } from './logoutWeb3';
import { deleteDatabase } from './logoutWeb3';

export const authApiClient = createApi({
  reducerPath: 'authApi' as const,
  tagTypes: [] as const,
  keepUnusedDataFor,
  baseQuery: baseQueryApp(APP_ROUTE),
  extractRehydrationInfo,
  endpoints: (builder) => ({
    login: builder.mutation<IAuthResult | { otp: true }, ILoginParams>({
      query: (body) => ({
        url: `/api/login`,
        method: 'POST',
        body: { ...body, otp: true },
      }),
    }),
    loginNFID: builder.mutation<IAuthResult | { otp: true }, ILoginWeb3Params>({
      query: (body) => ({
        url: `/auth/nfid_token`,
        method: 'POST',
        body: { ...body, otp: false },
      }),
    }),
    loginICP: builder.mutation<IAuthResult | { otp: true }, ILoginWeb3Params>({
      query: (body) => ({
        url: `/auth/iid_token `,
        method: 'POST',
        body: { ...body, otp: false },
      }),
    }),
    loginSocial: builder.query<
      { callback: string },
      { social: 'google' | 'facebook' }
    >({
      query: ({ social }) => ({ url: `/api/login/${social}` }),
    }),
    register: builder.mutation<IAuthResult | { otp: true }, IRegisterParams>({
      query: ({ name, ...body }) => ({
        url: `/api/register`,
        method: 'POST',
        body: {
          ...body,
          firstName: name?.split(' ')[0],
          lastName: name?.split(' ')[1],
          otp: true,
        },
      }),
    }),
    registerConfirm: builder.mutation<
      IAuthResult,
      { email: string; code: string }
    >({
      query: (body) => ({ url: `/register/confirm`, method: 'POST', body }),
    }),
    refreshToken: builder.query<{ token: string }, void>({
      query: () => ({ url: `/api/refresh-token`, method: 'POST' }),
    }),
    logout: builder.mutation<null, void>({
      queryFn: () => {
        clearDatabases();
        const token = syncStorage.token;
        if (token) {
          fetch(`${APP_ROUTE}/api/logout`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
          });
        }
        return { data: null };
      },
    }),
    forgotPassword: builder.mutation<null, { email: string }>({
      query: (body) => ({ url: '/password/email', method: 'POST', body }),
    }),
    passwordReset: builder.mutation<null, IResetPasswordParams>({
      query: (body) => ({ url: '/password/reset', method: 'POST', body }),
    }),
    passwordOtp: builder.mutation<null, IResetPasswordOtpParams>({
      query: (body) => ({ url: '/password/otp', method: 'POST', body }),
    }),
    resendOtp: builder.mutation<null, { email: string }>({
      query: (body) => ({ url: '/resend/otp', method: 'POST', body }),
    }),
    checkUsername: builder.mutation<null, { username: string }>({
      query: (body) => ({ url: `/api/check-username`, method: 'POST', body }),
    }),
  }),
});
