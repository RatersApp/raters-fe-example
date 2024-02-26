import { useTranslation } from 'next-i18next';
import cls from 'classnames';
import { useCoolDown } from '../../../common/helpers/hooks/useCoolDown';
import type { ILoadingButtonProps } from '../../../common/components/Buttons/LoadingButton';
import { LoadingButton } from '../../../common/components/Buttons/LoadingButton';

export const LoadingButtonCoolDown = (
  props: ILoadingButtonProps & {
    initialCoolDowned?: boolean;
    coolDown: number;
  },
) => {
  const { coolDown, initialCoolDowned, ...buttonProps } = props;
  const { t } = useTranslation();
  const [coolDownTime, coolDownedClick] = useCoolDown({
    coolDown,
    initialCoolDowned,
    onClick: (args) => buttonProps.onClick?.(args as any),
  });
  const isDisabled =
    !!coolDownTime || buttonProps.disabled || buttonProps.isLoading;

  return (
    <LoadingButton
      {...buttonProps}
      onClick={coolDownedClick}
      disabled={isDisabled}
      className={cls(
        buttonProps.className,
        isDisabled ? 'resendOtpDisabled' : '',
      )}
      text={
        coolDownTime
          ? t('EmailVerification.ResendOtpCoolDown', { coolDownTime })
          : t('EmailVerification.ResendOtp')
      }
    />
  );
};
