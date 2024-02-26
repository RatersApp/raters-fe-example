import type { ComponentType, FC } from 'react';
import type { PageProps } from './serverSideUtils';
import Head from 'next/head';
import { useRouter } from 'next/router';

export const addHeaders = (
  Component: FC | ComponentType,
  props?: { noindex: boolean },
) => {
  return function Headers({ meta, canonical, ...otherProps }: PageProps) {
    return (
      <>
        <Head>
          <title>{meta?.main_title}</title>
          <meta name="description" content={meta?.main_description} />
          <meta property="og:image" content={meta?.image} />
          <meta property="og:title" content={meta?.title} />
          <meta property="og:description" content={meta?.description} />
          {canonical && <link rel="canonical" href={canonical} />}
          {props?.noindex && <meta name="robots" content="noindex" />}
        </Head>
        <Component {...otherProps} />
      </>
    );
  };
};

export const addReadyHeaders = (
  Component: FC | ComponentType,
  props?: { noindex: boolean },
) =>
  addHeaders((props) => {
    const { isReady } = useRouter();
    return <>{isReady && <Component {...props} />}</>;
  }, props);
