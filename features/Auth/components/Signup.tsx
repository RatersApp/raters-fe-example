import { AuthWrapper } from './AuthWrapper';
import BackgroundEmail from '../../../common/assets/svg/auth/BackgroundEmail.svg';
import TermsOfUseCaption from '../../../common/components/Captions/TermsOfUseCaption';
import { Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { AuthSeparator } from './AuthSeparator';
import { useFormErrors } from '../common/hooks';
import { authApiClient } from '../../../common/api/authApiClient';
import { LoadingButton } from '../../../common/components/Buttons/LoadingButton';
import { MainButton } from '../../../common/components/Buttons/MainButton';
import type { IRegisterParams } from '../../../common/api/apiTypes';
import { AuthData } from '../common/useAuthChange';
import {
  emailRules,
  getLengthRule,
  InputApp,
  passwordRules,
  repeatPasswordRules,
} from '../../../common/components/Input/InputApp';
import { InputUsername } from '../../../common/components/Input/InputUsername';

export const Signup = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const form = useForm<IRegisterParams>({
    defaultValues: AuthData.state.signupFormState,
    mode: 'onBlur',
  });
  const { handleSubmit, control, getValues } = form;
  const [registerHandler, registerResult] = authApiClient.useRegisterMutation();
  const [otpHandler] = authApiClient.useResendOtpMutation();
  useFormErrors(form, registerResult.error);

  const onSubmit = (data: IRegisterParams) => {
    AuthData.state.isRegister = true;
    registerHandler(data)
      .unwrap()
      .then(() => {
        AuthData.state.signupFormState = getValues();
        const email = AuthData.state.signupFormState.email;
        otpHandler({ email });
        router.push({
          pathname: '/login/email/verification',
          query: {
            email,
            type: 'register',
          },
        });
      })
      .catch(() => {
        AuthData.state.isRegister = false;
      });
  };

  return (
    <AuthWrapper Background={BackgroundEmail}>
      <Typography className={'authTitle'} variant={'h6'}>
        {t('NewLogin.SignupTitle')}
      </Typography>
      <form className={'form'} onSubmit={handleSubmit(onSubmit)}>
        <InputApp
          label={t(`NewLogin.emailLabel`)}
          placeholder={t(`NewLogin.emailPlaceholder`)}
          name="email"
          type="email"
          control={control}
          rules={emailRules}
          inputProps={{ autoComplete: 'username' }}
        />
        <InputUsername
          label={t(`NewLogin.usernameLabel`)}
          placeholder={t(`NewLogin.usernamePlaceholder`)}
          control={control}
        />
        <InputApp
          label={t(`NewLogin.nameLabel`)}
          placeholder={t(`NewLogin.namePlaceholder`)}
          name={'name'}
          control={control}
          rules={{
            ...getLengthRule(t, 'minLength', 3),
            ...getLengthRule(t, 'maxLength', 30),
          }}
        />
        <InputApp
          label={t(`NewLogin.passwordLabel`)}
          placeholder={t(`NewLogin.passwordPlaceholder`)}
          name={'password'}
          control={control}
          inputProps={{ autoComplete: 'new-password' }}
          type="password"
          rules={passwordRules(t)}
        />
        <InputApp
          label={t(`NewLogin.repeatPasswordLabel`)}
          placeholder={t(`NewLogin.repeatPasswordPlaceholder`)}
          name={'passwordConfirmation'}
          control={control}
          type="password"
          rules={repeatPasswordRules(() => getValues().password)}
        />
        <LoadingButton
          className={'authButtonSpace'}
          type="submit"
          isLoading={registerResult.isLoading}
          text={t('NewLogin.Signup')}
        />
      </form>
      <AuthSeparator />
      <MainButton
        onClick={() => router.push('/login')}
        className={'authOutlinedButton'}
        variant="outlined"
        text={t('NewLogin.SignIn')}
      />
      <TermsOfUseCaption />
    </AuthWrapper>
  );
};
