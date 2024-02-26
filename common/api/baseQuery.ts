import type { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/dist/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { API_KEY } from './routes';
import { camelize, snakeize } from 'camelize-snakeize-ts';
import type { IError } from './apiError';
import { addErrorMessage } from './apiError';
import { delayPromise } from './helpers';
import { syncStorage } from '../helpers/syncStorage';

export const baseQueryApp =
  (baseUrl?: string): BaseQueryFn<FetchArgs, unknown, IError> =>
  async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers) => {
        headers.set('apiKey', API_KEY);
        headers.set('lang', syncStorage.userLang);
        headers.set('app-type', 'web');
        const token = syncStorage.token;
        if (!headers.has('Authorization') && token) {
          headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
      },
    });

    const request = () =>
      baseQuery(
        {
          responseHandler: async (response: Response) => {
            const text = await response.text();
            return text.length ? camelize(JSON.parse(text)) : null;
          },
          ...args,
          params: snakeize(args.params),
          body: snakeize(args.body),
        },
        api,
        extraOptions,
      );
    const query = request();

    return addErrorMessage(await manyAttemptsWorkaround(query, request));
  };

//todo remove after fix server
export const manyAttemptsWorkaround = async <
  T extends { data?: unknown } | PromiseLike<{ data?: unknown }>,
>(
  response: T,
  request: () => T | PromiseLike<T>,
) => {
  let query = await response;
  while (
    query.data &&
    (query.data as { data: string[] }).data?.[0] == 'Too Many Attempts.'
  ) {
    await delayPromise(5000);
    query = await request();
  }

  return query;
};
