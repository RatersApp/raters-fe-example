import { useTranslation } from 'next-i18next';
import Web3Logo from '../../../common/assets/svg/web3Logo.svg';
import { LoadingButton } from '../../../common/components/Buttons/LoadingButton';
import cls from 'classnames';

export const Web3Button = ({
  variant = 'contained',
  handleOpen,
}: {
  variant?: 'contained' | 'outlined';
  handleOpen: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <LoadingButton
      onClick={handleOpen}
      disableFocusRipple
      color="default"
      style={{
        backgroundColor: '#595EC6',
      }}
      className={cls(
        'loginButton',
        variant !== 'outlined' ? 'authButtonSpace' : 'web3Button',
      )}
      variant={variant}
      isLoading={false}
    >
      <div
        className={
          variant === 'outlined' ? 'authOutlinedButtonLogo' : 'authButtonLogo'
        }
      >
        <Web3Logo />
      </div>
      <p id="facebookAuthText">{t('NewLogin.web3')}</p>
    </LoadingButton>
  );
};
