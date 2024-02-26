import { Typography } from '@material-ui/core';
import GetAppsAuth from '../../Auth/components/GetAppsAuth';
import GoogleLogoBig from '../../../common/assets/svg/fundraising/GoogleLogoBig.svg';
import AppleLogoBig from '../../../common/assets/svg/fundraising/AppleLogoBig.svg';
import Image from 'next/image';
import QR from '../../../common/assets/png/QR.png';
import { useTranslationLock } from '../../../common/helpers/hooks/useTranslationLock';

export const MobileStores = ({ className }: { className: string }) => {
  const { t } = useTranslationLock('default');

  return (
    <div className={className}>
      <div>
        <Typography>{t('fundraiser.mobileStores.title')}</Typography>
        <Typography>{t('fundraiser.mobileStores.description')}</Typography>
        <GetAppsAuth
          GoogleElement={GoogleLogoBig}
          AppleElement={AppleLogoBig}
        />
      </div>
      <Image alt="qr" src={QR} />
    </div>
  );
};
