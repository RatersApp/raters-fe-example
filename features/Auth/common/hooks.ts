import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { IError } from '../../../common/api/apiError';
import { isIError } from '../../../common/api/apiError';
import type { SerializedError } from '@reduxjs/toolkit';
import { AuthData } from './useAuthChange';
import { useTranslation } from 'next-i18next';
import { authApiClient } from '../../../common/api/authApiClient';
import { useDispatch } from 'react-redux';
import type { IAuthResult } from '../../../common/api/apiTypes';
import { toast } from 'react-toastify';
import type { TFuncKey } from 'i18next';
import { camelize } from 'camelize-snakeize-ts';
import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';
import { syncStorage } from '../../../common/helpers/syncStorage';

export const useFormErrors = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(
  { control, setError }: UseFormReturn<TFieldValues>,
  error: IError | SerializedError | undefined,
) => {
  const { t } = useTranslation();
  useEffect(() => {
    let message: string | null = null;
    const keys = Array.from(control._names.mount) as TName[];
    if (isIError(error)) {
      if (typeof error.data?.message === 'object') {
        Object.entries(error.data.message).forEach(([k, v]) => {
          message = typeof v == 'string' ? v : v.join('\n');
          setError(
            keys.includes(k as TName) ? (k as TName) : keys[keys.length - 1],
            {
              message: t(message as TFuncKey),
            },
          );
        });
      } else {
        message =
          error.data?.message || error.message || 'Errors.unexpectedError';
        setError(keys[keys.length - 1], { message });
      }
    } else if (error) {
      setError(keys[keys.length - 1], { message: 'Errors.unexpectedError' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);
};

export const usePushLogin = () => {
  const router = useRouter();

  const pushLogin = useCallback(() => {
    router.push('/login');
    AuthData.state.startPage = router.asPath;
  }, [router]);

  return { pushLogin };
};

export const usePushSignup = () => {
  const router = useRouter();

  const pushSignup = useCallback(() => {
    router.push('/login/signup');
    AuthData.state.signupFormState = {};
  }, [router]);

  return { pushSignup };
};

export const useSocialAuth = (social: 'google' | 'facebook') => {
  const { t } = useTranslation();
  const { isLoading, data, error, refetch } = authApiClient.useLoginSocialQuery(
    {
      social,
    },
  );
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const listener = (event: StorageEvent) => {
      if (event.storageArea != localStorage) return;
      if (event.key === 'socialAuthData' && event.newValue) {
        const data = camelize(JSON.parse(event.newValue)) as IAuthResult;
        if (data.data.user.isNeedVerifyEmail) {
          syncStorage.tempToken = data.token;
          router.push('/login/email/change');
        } else {
          syncStorage.token = data.token;
        }
        AuthData.state.isRegister = data.isRegister;
        window.localStorage.setItem('socialAuthData', '');
      }
    };
    window.addEventListener('storage', listener);

    return () => window.removeEventListener('storage', listener);
  }, [dispatch]);

  const loginHandler = useCallback(() => {
    if (data) {
      window.open(data.callback);
    } else if (error) {
      toast.error(t(error.message as TFuncKey));
      refetch();
    }
  }, [data, error, refetch, t]);

  return { loginHandler, isLoading };
};

export const useDebounce = (value: string | undefined, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
