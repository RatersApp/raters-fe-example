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
import { useRouter } from 'next/router';
import { LoadingButtonCoolDown } from '../../../features/Auth/components/LoadingButtonCoolDown';
import { InputError } from '../Input/InputError';
import { apiClient } from '../../api/apiClient';
import { useLastError } from '../../helpers/hooks/useLastError';

export default function ChangeOtpPopup() {
  const { t } = useTranslation();
  const router = useRouter();
  const email = router.query.email as string;

  const form = useForm<{ code: string }>();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;
  const [changeHandler, changeResult] = apiClient.useChangeEmailMutation();
  const [sendHandler, sendResult] = apiClient.useSendOtpMutation();
  useFormErrors(form, useLastError([sendResult.error, changeResult.error]));

  const onSubmit = ({ code }: { code: string }) =>
    changeHandler({ email, code })
      .unwrap()
      .then(() => router.push(`/settings`));

  return (
    <PopupWrapper>
      <Typography className={styles.title}>
        {t('Popup.changeEmail.title')}
      </Typography>
      <Typography
        className={classNames([styles.description, openSans.className])}
      >
        {t('Popup.changeEmail.description', { email })}
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
              sendHandler({ email });
            }}
            coolDown={60}
            isLoading={sendResult.isLoading}
          />
          <LoadingButton
            isLoading={changeResult.isLoading}
            text={t('Popup.changeEmail.button')}
            type={'submit'}
          />
        </div>
      </form>
    </PopupWrapper>
  );
}
