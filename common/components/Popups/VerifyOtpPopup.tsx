import styles from './queryPopups.module.scss';
import { PopupWrapper } from './components/PopupWrapper';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { openSans } from '../../../pages/_app';
import { LoadingButton } from '../Buttons/LoadingButton';
import { InputApp } from '../Input/InputApp';
import { useForm } from 'react-hook-form';
import { useFormErrors } from '../../../features/Auth/common/hooks';
import { LoadingButtonCoolDown } from '../../../features/Auth/components/LoadingButtonCoolDown';
import { InputError } from '../Input/InputError';
import { apiClient } from '../../api/apiClient';
import { useLastError } from '../../helpers/hooks/useLastError';

export default function VerifyOtpPopup() {
  const { t } = useTranslation();
  const { data } = apiClient.endpoints.myProfile.useQuery();
  const email = data?.data.email || '';

  const form = useForm<{ code: string }>();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;
  const [sendHandler, sendResult] = apiClient.useSendOtpMutation();
  const [verifyHandler, verifyResult] = apiClient.useVerifyOtpMutation({
    fixedCacheKey: 'verify',
  });
  useFormErrors(form, useLastError([sendResult.error, verifyResult.error]));

  const onSubmit = ({ code }: { code: string }) => verifyHandler({ code });

  return (
    <PopupWrapper>
      <Typography className={styles.title}>
        {t('Popup.verifyEmail.title')}
      </Typography>
      <Typography
        className={classNames([styles.description, openSans.className])}
      >
        {t('Popup.verifyEmail.description', { email })}
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
              sendHandler({});
            }}
            coolDown={60}
            isLoading={sendResult.isLoading}
          />
          <LoadingButton
            isLoading={verifyResult.isLoading}
            text={t('Popup.verifyEmail.button')}
            type={'submit'}
          />
        </div>
      </form>
    </PopupWrapper>
  );
}
