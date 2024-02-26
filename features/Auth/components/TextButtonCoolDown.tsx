import { Typography } from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import cls from 'classnames';
import { useCoolDown } from '../../../common/helpers/hooks/useCoolDown';
import type { CSSProperties } from 'react';

export const TextButtonCoolDown = ({
  initialCoolDowned,
  onClick,
  coolDown,
  disabled,
  style,
}: {
  initialCoolDowned?: boolean;
  onClick: () => void;
  coolDown: number;
  disabled: boolean;
  style: CSSProperties;
}) => {
  const { t } = useTranslation();
  const [coolDownTime, coolDownedClick] = useCoolDown({
    coolDown,
    initialCoolDowned,
    onClick,
  });
  const isDisabled = coolDownTime || disabled;

  return (
    <Typography
      style={style}
      onClick={isDisabled ? undefined : coolDownedClick}
      className={cls('resendOtp', isDisabled ? 'resendOtpDisabled' : '')}
    >
      {coolDownTime
        ? t('EmailVerification.ResendOtpCoolDown', { coolDownTime })
        : t('EmailVerification.ResendOtp')}
    </Typography>
  );
};
