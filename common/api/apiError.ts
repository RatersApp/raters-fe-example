import type { QueryReturnValue } from '@reduxjs/toolkit/src/query/baseQueryTypes';
import type {
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query/react';
import type { TFuncKey } from 'i18next';
import type { SerializedError } from '@reduxjs/toolkit';
import { camelize } from 'camelize-snakeize-ts';

export function isIError<T extends IError>(
  error?: T | SerializedError,
): error is IError {
  return !!error && (error ? 'status' in error : false);
}

interface IBackendError {
  message: string | Record<string, string[] | string>;
  attempts?: number | null;
  waiting?: number;
}

export type IError = { message: TFuncKey } & (
  | {
      status: number;
      data?: IBackendError;
    }
  | {
      status: 'FETCH_ERROR';
      data?: undefined;
      error: string;
    }
  | {
      status: 'TIMEOUT_ERROR';
      data?: undefined;
      error: string;
    }
  | {
      status: 'PARSING_ERROR';
      originalStatus: number;
      data?: undefined;
      error: string;
    }
  | {
      status: 'CUSTOM_ERROR';
      data?: undefined;
      error: string;
    }
);

const errorProcessor = (error: FetchBaseQueryError): IError => {
  let message: TFuncKey;
  switch (error.status) {
    case 'FETCH_ERROR':
      return { ...error, data: undefined, message: 'Errors.connectionError' };
    case 'TIMEOUT_ERROR':
      return { ...error, data: undefined, message: 'Errors.timeoutError' };
    case 'CUSTOM_ERROR':
      return {
        ...error,
        data: undefined,
        message: 'Errors.unexpectedError',
      };
    case 'PARSING_ERROR':
      message =
        errorStatusDict[error.originalStatus] || 'Errors.unexpectedError';

      return { ...error, data: undefined, message };
    default: {
      const data = camelize(error.data) as IBackendError | undefined;
      message = errorStatusDict[error.status] || 'Errors.unexpectedError';

      return {
        ...error,
        data,
        message,
      };
    }
  }
};

const errorStatusDict: { [key: number]: TFuncKey | null } = {
  401: 'Errors.notAuthorized',
  404: 'Errors.notFound',
  500: 'Errors.unexpectedError',
};

export const addErrorMessage = (
  res: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>,
) => {
  if (res.error) {
    return {
      ...res,
      error: errorProcessor(res.error),
    };
  } else {
    return res;
  }
};
