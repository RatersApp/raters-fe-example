import styles from './queryPopups.module.scss';
import { PopupWrapper } from './components/PopupWrapper';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { openSans } from '../../../pages/_app';
import { authApiClient } from '../../api/authApiClient';
import { LoadingButton } from '../Buttons/LoadingButton';
import { InputApp } from '../Input/InputApp';
import { useForm } from 'react-hook-form';
import { useFormErrors } from '../../../features/Auth/common/hooks';
import { useRouter } from 'next/router';
import { LoadingButtonCoolDown } from '../../../features/Auth/components/LoadingButtonCoolDown';
import { InputError } from '../Input/InputError';
import { useLastError } from '../../helpers/hooks/useLastError';
import { apiClient } from '../../api/apiClient';

export default function PasswordOtpPopup() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data } = apiClient.endpoints.myProfile.useQuery();
  const email = data?.data.email || '';

  const form = useForm<{ code: string }>();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;
  const [confirmHandler, confirmResult] =
    authApiClient.usePasswordOtpMutation();
  const [forgotHandler, forgotResult] =
    authApiClient.useForgotPasswordMutation();
  useFormErrors(form, useLastError([confirmResult.error, forgotResult.error]));

  const onSubmit = ({ code }: { code: string }) =>
    confirmHandler({ email, code })
      .unwrap()
      .then(() => {
        router.push({
          pathname: `/settings`,
          query: { code },
        });
      });

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
      <InputError error={errors['code']} />
      <form className={styles.reset} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <InputApp
            placeholder={t(`NewLogin.otpPlaceholder`)}
            label={t(`NewLogin.otpLabel`)}
            name={'code'}
            control={control}
            rules={{ required: true }}
            handleError={false}
          />
        </div>
        <div>
          <LoadingButtonCoolDown
            variant={'outlined'}
            onClick={() => {
              reset({ code: '' });
              forgotHandler({ email });
            }}
            coolDown={60}
            isLoading={forgotResult.isLoading}
          />
          <LoadingButton
            isLoading={confirmResult.isLoading}
            text={t('Popup.resetPassword.button')}
            type={'submit'}
          />
        </div>
      </form>
    </PopupWrapper>
  );
}
