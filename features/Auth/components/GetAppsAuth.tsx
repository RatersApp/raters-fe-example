import type { FC } from 'react';
import dynamic from 'next/dynamic';

const Apple = dynamic(() => import('../../../common/assets/svg/AppleApp.svg'), {
  ssr: false,
});

const Google = dynamic(
  () => import('../../../common/assets/svg/GoogleApp.svg'),
  {
    ssr: false,
  },
);

interface IProps {
  query?: {
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
  };
  GoogleElement?: FC;
  AppleElement?: FC;
}

const GetAppsAuth = ({ query, GoogleElement, AppleElement }: IProps) => {
  const AppleIcon = AppleElement || Apple;
  const GoogleIcon = GoogleElement || Google;
  return (
    <div className="getAppAuth">
      <a
        rel="noreferrer"
        href={`https://play.google.com/store/apps/details?id=com.raters.app&referrer=utm_source%3D${
          query && query.utm_source
        }%26utm_medium%3D${query && query.utm_medium}%26utm_campaign%3D${
          query && query.utm_campaign
        }`}
        target="_blank"
      >
        <GoogleIcon />
      </a>
      <a
        rel="noreferrer"
        href={`https://apps.apple.com/app/apple-store/id1258540735?pt=118683219&ct=${
          query && query.utm_campaign
        }&mt=8`}
        target="_blank"
      >
        <AppleIcon />
      </a>
    </div>
  );
};

export default GetAppsAuth;
