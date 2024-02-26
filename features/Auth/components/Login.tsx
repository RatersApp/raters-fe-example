import { Link, Typography } from '@material-ui/core';
import MailIcon from '../../../common/assets/svg/mailIcon.svg';
import LoginBackground from '../../../common/assets/svg/auth/BackgroundLogin.svg';
import { FacebookButton } from './FacebookButton';
import { useRouter } from 'next/router';
import GetAppsAuth from './GetAppsAuth';
import { AuthWrapper } from './AuthWrapper';
import { AuthSeparator } from './AuthSeparator';
import cls from 'classnames';
import { Trans, useTranslation } from 'next-i18next';
import { GoogleButton } from './GoogleButton';
import { MainButton } from '../../../common/components/Buttons/MainButton';
import classNames from 'classnames';
import { openSans } from '../../../pages/_app';
import { AuthData } from '../common/useAuthChange';
import { usePushSignup } from '../common/hooks';
import { useEffect } from 'react';

export const Login = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { pushSignup } = usePushSignup();

  useEffect(() => {
    document.getElementById('app').style.paddingTop = 0;
  }, []);

  return (
    <AuthWrapper Background={LoginBackground}>
      <Typography variant={'h6'} className="authWelcomeMessage">
        {t('NewLogin.Title')}
      </Typography>
      <h5
        className={classNames([
          'welcomeMessageDescription',
          openSans.className,
        ])}
      >
        {t('NewLogin.Subtitle')}
      </h5>
      <span className="authWelcomeMessage">{t('NewLogin.SignIn')}</span>
      <FacebookButton />
      <GoogleButton />
      <MainButton
        onClick={() => router.push('/login/email')}
        className={cls('viaEmailButton', 'authButtonSpace')}
        variant="contained"
        color={'default'}
      >
        <div className={'authButtonLogo'}>
          <MailIcon />
        </div>
        <p>{t('NewLogin.Email')}</p>
      </MainButton>
      <AuthSeparator />
      <MainButton
        onClick={pushSignup}
        className={'authOutlinedButton'}
        variant="outlined"
        text={t('NewLogin.Signup')}
      />
      <Typography
        className={classNames(['continueAsGuestButton', openSans.className])}
      >
        <Trans i18nKey="NewLogin.Guest" i18n={i18n}>
          {t('NewLogin.Guest')}
          <Link onClick={() => router.push(AuthData.state.startPage || '/')}>
            Continue as Guest
          </Link>
        </Trans>
      </Typography>
      <GetAppsAuth />
    </AuthWrapper>
  );
};
