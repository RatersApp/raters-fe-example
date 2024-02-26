import client from '../api/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';
import type { GetStaticPropsContext, Redirect } from 'next';
import type { GetServerSidePropsContext } from 'next/types';
import { APP_ROUTE } from '../api/routes';
import { site } from '../config/strings';
import type { AppStore } from '../../app/store';
import { awaitReduxQueries, wrapper } from '../../app/store';
import { parseCookies } from './objectUtils';
import { apiClient } from '../api/apiClient';

export const canonicalHelper = (lng = 'default') => {
  if (lng === 'default') {
    return '';
  }
  return `/${lng}`;
};

export const getSSMetaGlossary =
  (type: string) => async (ctx: GetServerSidePropsContext) => {
    return {
      meta: await client
        .get(
          APP_ROUTE +
            `/og/${type}/0/${ctx.locale}/glossary_${type}?page=${ctx.query.page}`,
        )
        .then((response) => response.data),
    };
  };

export const getSSCanonical = (ctx: GetServerSidePropsContext) => ({
  canonical: site + canonicalHelper(ctx.locale) + ctx.req.url?.split('?')[0],
});

export const getSSTrans =
  (forceLocale?: string) => async (ctx: GetStaticPropsContext) =>
    getServerSideTranslations(forceLocale || ctx.locale);

export const getServerSideTranslations = async (locale = 'default') => {
  return await serverSideTranslations(locale, ['common'], {
    ...nextI18NextConfig,
    i18n: {
      ...nextI18NextConfig.i18n,
      localeDetection: false as const,
    },
    fallbackLng: locale,
  });
};

export const getSSFullMeta =
  (path: (ctx: GetServerSidePropsContext) => string) =>
  async (ctx: GetServerSidePropsContext) => ({
    meta: await client
      .get(
        APP_ROUTE +
          `/og/${path(ctx)}/${ctx.locale === 'default' ? 'en' : ctx.locale}`,
      )
      .then((response) => response.data),
  });

export const getSSMeta = (path: string) =>
  getSSFullMeta(() => 'generic/' + path);

type Redirector = (ctx: GetServerSidePropsContext) => Redirect | null;
type SSProps<T = unknown> = (ctx: GetServerSidePropsContext) => T | Promise<T>;

export const getSSProps =
  (props: SSProps[], redirector?: Redirector) =>
  async (ctx: GetServerSidePropsContext) => {
    parseCookies(ctx.req);

    const redirect = redirector?.(ctx);
    if (redirect) {
      return { redirect };
    } else {
      return {
        props: await Promise.all(props.map((el) => el(ctx))).then((res) =>
          res.reduce<Record<string, unknown>>(
            (p, c) => (typeof c == 'object' ? { ...p, ...c } : p),
            {},
          ),
        ),
      };
    }
  };

export const getStoreProps = (
  storeActions: (store: AppStore, ctx: GetServerSidePropsContext) => void,
  props: SSProps[],
  redirector?: Redirector,
) =>
  wrapper.getServerSideProps((store: AppStore) =>
    getSSProps(
      [
        ...props,
        (ctx) => {
          parseCookies(ctx.req);

          store.dispatch(apiClient.endpoints.userProfile.initiate({}));
          return storeActions(store, ctx);
        },
        async () => await awaitReduxQueries(store),
      ],
      redirector,
    ),
  );

export type Meta = {
  main_title: string;
  main_description: string;
  image: string;
  title: string;
  description: string;
};

export type PageProps = {
  meta: Meta;
  canonical?: string;
};
