import { AuthWrapper } from './AuthWrapper';
import BackgroundEmail from '../../../common/assets/svg/auth/BackgroundEmail.svg';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import cls from 'classnames';
import TermsOfUseCaption from '../../../common/components/Captions/TermsOfUseCaption';
import { LoadingButton } from '../../../common/components/Buttons/LoadingButton';
import { authApiClient } from '../../../common/api/authApiClient';
import { useFormErrors } from '../common/hooks';
import { TextButtonCoolDown } from './TextButtonCoolDown';
import { AuthData } from '../common/useAuthChange';
import { openSans } from '../../../pages/_app';
import { InputApp } from '../../../common/components/Input/InputApp';
import { useLastError } from '../../../common/helpers/hooks/useLastError';
import { apiClient } from '../../../common/api/apiClient';
import { toast } from 'react-toastify';
import { syncStorage } from '../../../common/helpers/syncStorage';

export const EmailVerification = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { email, type } = router.query as Record<string, string>;

  const form = useForm<{ code: string }>();
  const { handleSubmit, control, reset, setValue } = form;
  const [forgotHandler, forgotResult] = authApiClient.usePasswordOtpMutation();
  const [registerHandler, registerResult] =
    authApiClient.useRegisterConfirmMutation();
  const [forgotOtpHandler, forgotOtpResult] =
    authApiClient.useForgotPasswordMutation();
  const [registerOtpHandler, registerOtpResult] =
    authApiClient.useResendOtpMutation();
  const [changeOtpHandler, changeOtpResult] = apiClient.useSendOtpMutation();
  const [changeHandler, changeResult] = apiClient.useChangeEmailMutation();
  const isLoading =
    forgotResult.isLoading ||
    registerResult.isLoading ||
    changeResult.isLoading;
  const isLoadingOtp =
    forgotOtpResult.isLoading ||
    registerOtpResult.isLoading ||
    changeOtpResult.isLoading;
  useFormErrors(
    form,
    useLastError([
      forgotResult.error,
      registerResult.error,
      changeResult.error,
      forgotOtpResult.error,
      registerOtpResult.error,
      changeOtpResult.error,
    ]),
  );

  const onSubmit = ({ code }: { code: string }) => {
    switch (type) {
      case 'forgot':
        forgotHandler({ email, code })
          .unwrap()
          .then(() => {
            router.push({
              pathname: '/login/reset',
              query: { code, email },
            });
          });
        break;
      case 'register':
      case 'verify':
        if (type == 'register') {
          AuthData.state.isRegister = true;
        }
        registerHandler({ email, code })
          .unwrap()
          .catch(() => {
            AuthData.state.isRegister = false;
          });
        break;
      case 'change': {
        const customToken = syncStorage.tempToken;
        changeHandler({ email, code, customToken })
          .unwrap()
          .then(() => (syncStorage.token = customToken));
        break;
      }
      default:
        toast.error('Unsupported verification type');
    }
  };

  return (
    <AuthWrapper Background={BackgroundEmail}>
      <Typography className={'authTitle'} variant={'h6'}>
        {t(
          type == 'forgot'
            ? 'EmailVerification.resetPasswordTitle'
            : 'EmailVerification.Title',
        )}
      </Typography>
      <Typography className={cls('authDescription', openSans.className)}>
        {t(
          type == 'forgot'
            ? 'EmailVerification.resetPasswordDescription'
            : 'EmailVerification.Description',
          { email },
        )}
      </Typography>
      {type != 'verify' && (
        <Typography
          className={cls('changeEmail', openSans.className)}
          onClick={router.back}
        >
          {t('EmailVerification.ChangeEmail')}
        </Typography>
      )}
      <div style={{ height: '12px' }} />
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <InputApp
          placeholder={t(`NewLogin.otpPlaceholder`)}
          label={t(`NewLogin.otpLabel`)}
          name={'code'}
          control={control}
          rules={{ required: true }}
        />
        <LoadingButton
          isLoading={isLoading}
          className={'authButtonSpace'}
          color="primary"
          variant="contained"
          type="submit"
          text={t(
            type == 'register' ? 'NewLogin.Signup' : 'NewLogin.VerifyEmail',
          )}
        />
      </form>
      <TermsOfUseCaption />
      <TextButtonCoolDown
        style={{ alignSelf: 'center' }}
        disabled={isLoadingOtp}
        onClick={() => {
          reset();
          setValue('code', '');
          switch (type) {
            case 'forgot':
              forgotOtpHandler({ email }).unwrap().then(forgotResult.reset);
              break;
            case 'register':
            case 'verify':
              registerOtpHandler({ email }).unwrap().then(registerResult.reset);
              break;
            case 'change':
              changeOtpHandler({ email }).unwrap().then(changeResult.reset);
              break;
            default:
              toast.error('Unsupported verification type');
          }
        }}
        coolDown={60}
      />
    </AuthWrapper>
  );
};
