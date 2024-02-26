import type {
  QueryDefinition,
  QueryExtraOptions,
} from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import type { IPaged, IResponse } from './apiTypes';
import { isEqual } from 'lodash';
import type { EndpointDefinition } from '@reduxjs/toolkit/src/query/endpointDefinitions';
import { defaultSerializeQueryArgs } from '@reduxjs/toolkit/dist/query/react';

const transformToPaged = (
  res:
    | IResponse<unknown[]>
    | IPaged<unknown>
    | IResponse<{
        data: unknown[];
        currentPage: number;
        firstPageUrl: string;
        from: number;
        lastPage: number;
        lastPageUrl: string;
        nextPageUrl: string;
        path: string;
        perPage: number;
        prevPageUrl: string | null;
        to: number;
        total: number;
      }>,
): IPaged<any> => {
  if ('meta' in res) {
    return res;
  } else if ('data' in res.data) {
    return {
      data: res.data.data,
      links: {
        first: res.data.firstPageUrl,
        last: res.data.lastPageUrl,
        next: res.data.nextPageUrl,
        prev: res.data.prevPageUrl,
      },
      meta: {
        currentPage: res.data.currentPage,
        lastPage: res.data.lastPage,
        perPage: res.data.perPage,
        to: res.data.to,
        from: res.data.from,
        path: res.data.path,
        total: res.data.total,
      },
    };
  } else {
    return {
      data: res.data,
      links: {
        first: '',
        last: '',
        next: null,
        prev: null,
      },
      meta: {
        currentPage: 1,
        lastPage: 1,
        perPage: 1,
        to: 1,
        from: 1,
        path: '',
        total: 1,
      },
    };
  }
};

export const infiniteDefinition = <
  T extends Omit<QueryDefinition<any, any, any, any, any>, 'type'>,
>(
  definition: T,
) => {
  const merge: QueryExtraOptions<any, any, any, any>['merge'] = (
    currentCache,
    newItems,
    otherArgs,
  ) => {
    if ((otherArgs.arg.page || 1) > 1) {
      newItems.data.unshift(...(currentCache?.data || []));
      return newItems;
    }
    return currentCache;
  };
  const forceRefetch: QueryExtraOptions<any, any, any, any>['forceRefetch'] = ({
    currentArg,
    previousArg,
  }) => {
    return !isEqual(currentArg, previousArg);
  };
  return {
    ...definition,
    serializeQueryArgs: ({
      queryArgs: { page, ...otherArgs },
      ...other
    }: {
      queryArgs: { page?: number };
      endpointDefinition: EndpointDefinition<any, any, any, any>;
      endpointName: string;
    }) => defaultSerializeQueryArgs({ ...other, queryArgs: otherArgs }),
    merge,
    forceRefetch,
    transformResponse: transformToPaged,
  };
};
