import type { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/dist/query/react';
import type { IError } from './apiError';
import { baseQueryApp } from './baseQuery';
import { authApiClient } from './authApiClient';

export const baseQueryWithReAuth =
  (baseUrl?: string): BaseQueryFn<FetchArgs, unknown, IError> =>
  async (args, api, extraOptions) => {
    const result = await baseQueryApp(baseUrl)(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
      api.dispatch(authApiClient.endpoints.logout.initiate());
    }

    return result;
  };
