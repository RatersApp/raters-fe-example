import GoogleLogo from '../../../common/assets/svg/GoogleLogo.svg';
import { useTranslation } from 'next-i18next';
import { LoadingButton } from '../../../common/components/Buttons/LoadingButton';
import { useSocialAuth } from '../common/hooks';
import cls from 'classnames';

export const GoogleButton = () => {
  const { t } = useTranslation();
  const { loginHandler, isLoading } = useSocialAuth('google');

  return (
    <LoadingButton
      onClick={loginHandler}
      disableFocusRipple
      color="secondary"
      className={cls('loginButton', 'authButtonSpace')}
      variant="contained"
      isLoading={isLoading}
    >
      <div className={'authButtonLogo'}>
        <GoogleLogo />
      </div>
      <p id="googleAuthText">{t('NewLogin.Google')}</p>
    </LoadingButton>
  );
};
