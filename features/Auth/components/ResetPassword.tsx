import { Typography } from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import BackgroundPassword from '../../../common/assets/svg/auth/BackgroundPassword.svg';
import { AuthWrapper } from './AuthWrapper';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '../../../common/components/Buttons/LoadingButton';
import classNames from 'classnames';
import { openSans } from '../../../pages/_app';
import { authApiClient } from '../../../common/api/authApiClient';
import { useFormErrors } from '../common/hooks';
import { useRouter } from 'next/router';
import {
  InputApp,
  passwordRules,
  repeatPasswordRules,
} from '../../../common/components/Input/InputApp';

export const ResetPassword = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { email, code } = router.query as Record<string, string>;

  const [resetHandler, resetResult] = authApiClient.usePasswordResetMutation();
  const form = useForm<{ password: string; passwordConfirmation: string }>();
  const { handleSubmit, control, getValues } = form;
  useFormErrors(form, resetResult.error);

  const onSubmit = (data: {
    password: string;
    passwordConfirmation: string;
  }) => {
    resetHandler({
      ...data,
      email,
      code,
    })
      .unwrap()
      .then(() => router.push('/login/email'));
  };

  return (
    <AuthWrapper Background={BackgroundPassword} isCanBack={false}>
      <Typography className={'authTitle'} variant={'h6'}>
        {t('ResetPassword.Title')}
      </Typography>
      <Typography
        className={classNames(['authDescription', openSans.className])}
      >
        {t('ResetPassword.Description')}
      </Typography>
      <form className={'form'} onSubmit={handleSubmit(onSubmit)}>
        <InputApp
          label={t(`NewLogin.newPasswordLabel`)}
          placeholder={t(`NewLogin.newPasswordPlaceholder`)}
          name={'password'}
          control={control}
          type="password"
          rules={passwordRules(t)}
        />
        <InputApp
          label={t(`NewLogin.repeatNewPasswordLabel`)}
          placeholder={t(`NewLogin.repeatNewPasswordPlaceholder`)}
          name={'passwordConfirmation'}
          control={control}
          rules={repeatPasswordRules(() => getValues().password)}
          type="password"
        />
        <LoadingButton
          isLoading={resetResult.isLoading}
          className={'authButtonSpace'}
          color="primary"
          variant="contained"
          type="submit"
          text={t('ResetPassword.Continue')}
        />
      </form>
    </AuthWrapper>
  );
};
