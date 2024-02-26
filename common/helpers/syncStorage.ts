import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';

let token = Cookies.get('token') || undefined;

let userLang = Cookies.get('userLang') || 'en';

export const syncStorage = {
  get userId() {
    return token ? jwtDecode<{ sub: number }>(token).sub : null;
  },
  get token() {
    return token;
  },
  set token(newToken) {
    token = newToken;
    Cookies.set('token', newToken || '', { expires: 365 });
  },
  get userLang() {
    return userLang || 'en';
  },
  set userLang(newLang) {
    userLang = newLang;
    Cookies.set('userLang', newLang || '', { expires: 365 });
  },
  get tempToken() {
    return Cookies.get('tempToken');
  },
  set tempToken(newToken) {
    Cookies.set('tempToken', newToken || '', { expires: 365 });
  },
};

export const useSyncStorage = () => {
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    let lastToken = token;
    const intervalId = setInterval(() => {
      const newToken = Cookies.get('token') || undefined;
      if (lastToken != newToken) {
        lastToken = newToken;
        syncStorage.token = newToken;
        forceUpdate((count) => count + 1);
      }
    }, 1000);

    return () => clearTimeout(intervalId);
  }, []);

  return syncStorage;
};
