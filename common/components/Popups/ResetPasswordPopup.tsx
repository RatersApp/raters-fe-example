import styles from './queryPopups.module.scss';
import { PopupWrapper } from './components/PopupWrapper';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { openSans } from '../../../pages/_app';
import { authApiClient } from '../../api/authApiClient';
import { LoadingButton } from '../Buttons/LoadingButton';
import { useOpenPopup } from './hooks/useOpenPopup';
import { InputError } from '../Input/InputError';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useFormErrors } from '../../../features/Auth/common/hooks';
import { apiClient } from '../../api/apiClient';

export default function ResetPasswordPopup() {
  const { t } = useTranslation();
  const [forgotHandler, forgotResult] =
    authApiClient.useForgotPasswordMutation();
  const { data } = apiClient.endpoints.myProfile.useQuery();
  const email = data?.data.email || '';
  const openPasswordOtp = useOpenPopup('passwordOtp', true);

  const form = useForm<{ email: string }>();
  useFormErrors(form, forgotResult.error);
  const {
    control,
    formState: { errors },
  } = form;

  const onSubmit = () =>
    forgotHandler({ email }).unwrap().then(openPasswordOtp);

  return (
    <PopupWrapper>
      <Typography className={styles.title}>
        {t('Popup.resetPassword.title')}
      </Typography>
      <Typography
        className={classNames([styles.description, openSans.className])}
      >
        {t('Popup.resetPassword.description', { email })}
      </Typography>
      <form>
        <Controller name={'email'} control={control} render={() => <></>} />
        <InputError error={errors['email']} />
        <LoadingButton
          isLoading={forgotResult.isLoading}
          className={styles.button}
          text={t('Popup.resetPassword.button')}
          onClick={onSubmit}
        />
      </form>
    </PopupWrapper>
  );
}
