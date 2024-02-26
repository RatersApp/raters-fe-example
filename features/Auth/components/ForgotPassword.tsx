import React from 'react';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import BackgroundEmail from '../../../common/assets/svg/auth/BackgroundEmail.svg';
import { AuthWrapper } from './AuthWrapper';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '../../../common/components/Buttons/LoadingButton';
import { useFormErrors } from '../common/hooks';
import { authApiClient } from '../../../common/api/authApiClient';
import { useRouter } from 'next/router';
import {
  emailRules,
  InputApp,
} from '../../../common/components/Input/InputApp';

export const ForgotPassword = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [forgotHandler, forgotResult] =
    authApiClient.useForgotPasswordMutation();
  const form = useForm<{ email: string }>({
    defaultValues: { email: router.query.email as string },
  });
  const { handleSubmit, control } = form;
  useFormErrors(form, forgotResult.error);

  const onSubmit = ({ email }: { email: string }) =>
    forgotHandler({ email })
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
          query: { email, type: 'forgot' },
        });
      });

  return (
    <AuthWrapper Background={BackgroundEmail}>
      <Typography className={'authTitle'} variant={'h6'}>
        {t('ForgotPassword.Title')}
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
          isLoading={forgotResult.isLoading}
          text={t('ForgotPassword.SendEmail')}
        />
      </form>
    </AuthWrapper>
  );
};
