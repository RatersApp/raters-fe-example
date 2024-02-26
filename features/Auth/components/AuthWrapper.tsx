import type { FC, ReactNode } from 'react';
import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Typography } from '@material-ui/core';
import RatersLogoTransparent from '../../../common/assets/svg/RatersLogoTransparent4x-xxxhdpi.svg';
import RatersLogoTitle from '../../../common/assets/svg/RatersLogoTitle.svg';
import BackArrow from '../../../common/assets/svg/auth/BackArrow.svg';

export const AuthWrapper = ({
  Background,
  isCanBack = true,
  children,
  back,
}: {
  Background: FC<{ className?: string }>;
  isCanBack?: boolean;
  children: ReactNode[];
  back?: () => void;
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className={'authWrapper'}>
      <div className={'authContent'}>
        <div className={'authHeader'}>
          <div onClick={() => router.push('/')} className={'authLogo'}>
            <div className="ratersLogoWrapper">
              <RatersLogoTransparent />
            </div>
            <RatersLogoTitle />
          </div>
          {isCanBack && (
            <span onClick={back || router.back} className={'authBackContainer'}>
              <BackArrow />
              <Typography className="backTitle">
                {t('NewLogin.Back')}
              </Typography>
            </span>
          )}
        </div>
        <div className={'authBody'}>{children}</div>
      </div>
      <Background className={'loginBackground'} />
    </div>
  );
};
