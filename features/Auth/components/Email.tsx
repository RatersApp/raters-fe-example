import React, { useEffect } from 'react';
import { Link, Typography } from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import { FacebookButton } from './FacebookButton';
import { useRouter } from 'next/router';
import TermsOfUseCaption from '../../../common/components/Captions/TermsOfUseCaption';
import { AuthSeparator } from './AuthSeparator';
import { useForm } from 'react-hook-form';
import { AuthWrapper } from './AuthWrapper';
import BackgroundEmail from '../../../common/assets/svg/auth/BackgroundEmail.svg';
import classNames from 'classnames';
import { useFormErrors, usePushSignup } from '../common/hooks';
import { authApiClient } from '../../../common/api/authApiClient';
import { LoadingButton } from '../../../common/components/Buttons/LoadingButton';
import { MainButton } from '../../../common/components/Buttons/MainButton';
import { openSans } from '../../../pages/_app';
import {
  emailRules,
  InputApp,
  passwordRules,
} from '../../../common/components/Input/InputApp';
import type { ILoginParams } from '../../../common/api/apiTypes';
import { InputError } from '../../../common/components/Input/InputError';
import { AuthData } from '../common/useAuthChange';

export const Email = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { pushSignup } = usePushSignup();

  const form = useForm<ILoginParams>();
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = form;
  const [loginHandler, loginResult] = authApiClient.useLoginMutation();
  const [otpHandler] = authApiClient.useResendOtpMutation();
  useFormErrors(form, loginResult.error);

  useEffect(() => {
    AuthData.state.isRegister = false;
    if (loginResult.data && 'otp' in loginResult.data) {
      const email = getValues().email;
      otpHandler({ email });
      AuthData.state.isRegister = true;
      router.push({
        pathname: '/login/email/verification',
        query: { email, type: 'verify' },
      });
    }
  }, [getValues, loginResult.data, router]);

  return (
    <AuthWrapper Background={BackgroundEmail}>
      <Typography className={'authTitle'} variant={'h6'}>
        {t('Email.TitleLabel')}
      </Typography>
      <form className="form" onSubmit={handleSubmit(loginHandler)}>
        <InputApp
          name="email"
          type="email"
          placeholder={t(`NewLogin.emailPlaceholder`)}
          label={t(`NewLogin.emailLabel`)}
          control={control}
          rules={emailRules}
        />
        <InputApp
          name="password"
          placeholder={t(`NewLogin.passwordPlaceholder`)}
          label={t(`NewLogin.passwordLabel`)}
          type="password"
          control={control}
          rules={{ ...passwordRules(t), pattern: undefined }}
          handleError={false}
        />
        <Typography className="forgotPassword">
          <Link
            onClick={() => {
              router.push({
                pathname: '/login/forgot',
                query: { email: getValues().email },
              });
            }}
          >
            {t('Email.ForgotPassword')}
          </Link>
        </Typography>
        <InputError error={errors['password']} />
        <LoadingButton
          disableFocusRipple
          className={'authButtonSpace'}
          color="primary"
          variant="contained"
          type="submit"
          isLoading={loginResult.isLoading}
          text={t('NewLogin.SignIn')}
        />
      </form>
      <AuthSeparator />
      <MainButton
        onClick={pushSignup}
        className={'authOutlinedButton'}
        variant="outlined"
        text={t('NewLogin.Signup')}
      />
      <Typography
        className={classNames(['facebookDescription', openSans.className])}
      >
        {t('Email.FacebookLabel')}
      </Typography>
      <FacebookButton variant={'outlined'} />
      <TermsOfUseCaption />
    </AuthWrapper>
  );
};
