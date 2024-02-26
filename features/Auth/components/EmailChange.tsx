import React from 'react';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import BackgroundEmail from '../../../common/assets/svg/auth/BackgroundEmail.svg';
import { AuthWrapper } from './AuthWrapper';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '../../../common/components/Buttons/LoadingButton';
import { useFormErrors } from '../common/hooks';
import { useRouter } from 'next/router';
import {
  emailRules,
  InputApp,
} from '../../../common/components/Input/InputApp';
import { apiClient } from '../../../common/api/apiClient';
import { syncStorage } from '../../../common/helpers/syncStorage';

export const EmailChange = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [sendHandler, sendResult] = apiClient.useSendOtpMutation();
  const form = useForm<{ email: string }>({
    defaultValues: { email: router.query.email as string },
  });
  const { handleSubmit, control } = form;
  useFormErrors(form, sendResult.error);

  const onSubmit = ({ email }: { email: string }) => {
    const customToken = syncStorage.tempToken;
    sendHandler({ email, customToken })
      .unwrap()
      .then(() => {
        router.replace(
          {
            pathname: router.pathname,
            query: { email },
          },
          undefined,
          { shallow: true },
        );
        router.push({
          pathname: '/login/email/verification',
          query: { email, type: 'change' },
        });
      });
  };

  return (
    <AuthWrapper Background={BackgroundEmail}>
      <Typography className={'authTitle'} variant={'h6'}>
        {t('NewLogin.emailChange.title')}
      </Typography>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <InputApp
          placeholder={t(`NewLogin.emailPlaceholder`)}
          label={t(`NewLogin.emailLabel`)}
          name={'email'}
          type="email"
          control={control}
          rules={emailRules}
        />
        <LoadingButton
          className={'authButtonSpace'}
          color="primary"
          variant="contained"
          type="submit"
          isLoading={sendResult.isLoading}
          text={t('NewLogin.emailChange.button')}
        />
      </form>
    </AuthWrapper>
  );
};
