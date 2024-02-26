import type { BaseEndpointDefinition } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import type { IError } from './apiError';
import { delayPromise } from './helpers';

export const mockDefinition = <
  T extends Omit<BaseEndpointDefinition<any, any, any>, 'type'>,
>(
  definition: T & {
    mockData: {
      isMock: boolean;
      data: T extends BaseEndpointDefinition<infer Args, any, infer Result>
        ? (args: Args) => Result
        : never;
      emitError?: true | IError;
    };
  },
) => {
  if (definition.mockData.isMock) {
    return {
      ...definition,
      query: undefined,
      queryFn: async (
        arg: T extends BaseEndpointDefinition<infer Args, any, any>
          ? Args
          : never,
      ) => {
        await delayPromise(1500);
        if (definition.mockData.emitError) {
          return {
            error:
              typeof definition.mockData.emitError == 'object'
                ? definition.mockData.emitError
                : ({
                    status: 'FETCH_ERROR',
                    error: 'test',
                    message: 'Errors.connectionError',
                  } as IError),
          } as const;
        } else {
          return {
            data:
              definition.transformResponse?.(
                definition.mockData.data(arg),
                {},
                arg,
              ) ||
              definition.mockData.data(arg) ||
              null,
          };
        }
      },
    };
  } else {
    return definition;
  }
};
