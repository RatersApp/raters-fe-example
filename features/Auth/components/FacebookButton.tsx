import { useTranslation } from 'next-i18next';
import FacebookLogo from '../../../common/assets/svg/facebookLogo.svg';
import { LoadingButton } from '../../../common/components/Buttons/LoadingButton';
import { useSocialAuth } from '../common/hooks';
import cls from 'classnames';

export const FacebookButton = ({
  variant = 'contained',
}: {
  variant?: 'contained' | 'outlined';
}) => {
  const { t } = useTranslation();
  const { loginHandler, isLoading } = useSocialAuth('facebook');

  return (
    <LoadingButton
      onClick={loginHandler}
      disableFocusRipple
      className={cls(
        'loginButton',
        variant !== 'outlined' ? 'authButtonSpace' : 'facebookButton',
      )}
      variant={variant}
      isLoading={isLoading}
    >
      <div
        className={
          variant === 'outlined' ? 'authOutlinedButtonLogo' : 'authButtonLogo'
        }
      >
        <FacebookLogo />
      </div>
      <p id="facebookAuthText">{t('NewLogin.Facebook')}</p>
    </LoadingButton>
  );
};
