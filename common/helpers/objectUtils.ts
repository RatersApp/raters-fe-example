import findKey from 'lodash/findKey';
import barColors from '../../common/config/colors';
import cookie from 'cookie';
import { syncStorage } from './syncStorage';
import type { GetServerSidePropsContext } from 'next/types';

export const getCorrelationBarColor = (correlation: number) => {
  return findKey(barColors, (value) => correlation <= value);
};

export function getLocation(href: string) {
  const match = href?.match(
    /^(https?:)\/\/(([^:/?#]*)(?::([0-9]+))?)([/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/,
  );
  return (
    match && {
      href: href,
      protocol: match[1],
      host: match[2],
      hostname: match[3],
      port: match[4],
      pathname: match[5],
      search: match[6],
      hash: match[7],
    }
  );
}

export function parseCookies(req: GetServerSidePropsContext['req']) {
  const cookies = cookie.parse(
    req ? req.headers.cookie || '' : document.cookie,
  );
  syncStorage.token = cookies.token;
  syncStorage.userLang = cookies.userLang;
}

export const deleteFacebookAccessToken = (url: string) => {
  try {
    const newurl = new URL(url);
    const params = new URLSearchParams(newurl.search);

    params.delete('access_token'); //Query string is now: 'bar=2'

    newurl.search = params.toString();
    return newurl.href;
  } catch (e) {
    return url;
  }
};
