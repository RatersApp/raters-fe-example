import type { AnyAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { defaultSerializeQueryArgs } from '@reduxjs/toolkit/dist/query';
import type { FetchArgs } from '@reduxjs/toolkit/dist/query/react';
import type { SerializeQueryArgs } from '@reduxjs/toolkit/dist/query/defaultSerializeQueryArgs';
import { snakeize } from 'camelize-snakeize-ts';

export const keepUnusedDataFor = 60 * 30;

export const extractRehydrationInfo = (
  action: AnyAction,
  { reducerPath }: { reducerPath: string },
) => {
  return action.type == HYDRATE ? action.payload?.[reducerPath] : undefined;
};

export async function delayPromise<T>(millis: number, value?: T): Promise<T> {
  return new Promise((resolve): void => {
    setTimeout(() => {
      resolve(value as T);
    }, millis);
  });
}

export interface IPageFilter {
  page?: number;
  pageSize?: number;
  lastCurrentData?: unknown;
  arrayPath?: string;
}

export const serializeQueryArgs: SerializeQueryArgs<
  FetchArgs & IPageFilter
> = ({
  queryArgs: { page, pageSize, lastCurrentData, arrayPath, ...otherArgs } = {},
  ...other
}) =>
  defaultSerializeQueryArgs({
    queryArgs: snakeize(otherArgs),
    ...other,
  });

export function deleteQuery(asPath: string) {
  return asPath.split('?')[0];
}
