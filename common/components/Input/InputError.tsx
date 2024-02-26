import { Typography } from '@material-ui/core';
import type { TFuncKey } from 'i18next';
import { useTranslation } from 'next-i18next';
import type { FieldError } from 'react-hook-form';

export const InputError = ({ error }: { error: FieldError | undefined }) => {
  const { t } = useTranslation();
  const message = error?.message || error?.type;

  return message ? (
    <Typography className={'inputErrorMessage'}>
      {t(message as TFuncKey)}
    </Typography>
  ) : null;
};
