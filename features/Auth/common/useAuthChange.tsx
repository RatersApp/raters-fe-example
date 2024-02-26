import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { authApiClient } from '../../../common/api/authApiClient';
import { useOnChange } from '../../../common/helpers/hooks/useOnChange';
import jwtDecode from 'jwt-decode';
import dayjs from 'dayjs';
import {
  syncStorage,
  useSyncStorage,
} from '../../../common/helpers/syncStorage';
import { useAppDispatch } from '../../../app/reduxHelpers';

export interface ISignUpForm {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface IAuthState {
  startPage?: string;
  isRegister: boolean;
  signupFormState: ISignUpForm | Record<string, never>;
}

export const AuthData: { state: IAuthState } = {
  state: {
    isRegister: false,
    signupFormState: {},
  },
};

export const useAuthChange = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const { userId, token } = useSyncStorage();
  useOnChange(() => {
    let redirectRoute = '/login';
    if (userId) {
      const startPage = AuthData.state.startPage;
      if (
        startPage?.includes('/about-us') ||
        (!startPage && AuthData.state.isRegister)
      ) {
        redirectRoute = '/explore';
      } else {
        redirectRoute = startPage || '/feed';
      }
      if (AuthData.state.isRegister) {
        redirectRoute += '?popup=congratulations';
      }
      AuthData.state = {
        isRegister: false,
        signupFormState: {},
      };
    }
    router.push(redirectRoute);
    if (userId) {
      syncStorage.userLang = i18n.language;
    } else {
      syncStorage.userLang = 'en';
    }
  }, [userId]);
  const [logout] = authApiClient.useLogoutMutation();

  useEffect(() => {
    if (token) {
      const endDate = dayjs(jwtDecode<{ exp: number }>(token).exp * 1000);
      if (endDate.diff(dayjs(), 'day') < 14) {
        dispatch(authApiClient.endpoints.refreshToken.initiate());
      }
    }
  }, []);

  useOnChange(() => {
    if (!token) {
      logout();
    }
  }, [token]);
};
