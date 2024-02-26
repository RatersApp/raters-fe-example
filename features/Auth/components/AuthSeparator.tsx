import { Typography } from '@material-ui/core';
import { useTranslation } from 'next-i18next';

export const AuthSeparator = () => {
  const { t } = useTranslation();

  return (
    <div className={'authSeparator'}>
      <div />
      <Typography className={'authOr'}>{t('NewLogin.or')}</Typography>
      <div />
    </div>
  );
};
