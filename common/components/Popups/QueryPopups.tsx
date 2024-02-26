import type { PopupId } from './hooks/useOpenPopup';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

export const QueryPopups = () => {
  const router = useRouter();

  let popup;
  const popupQuery = router.query.popup;
  const popupId = (
    Array.isArray(popupQuery) ? popupQuery[popupQuery.length - 1] : popupQuery
  ) as PopupId;
  switch (popupId) {
    case 'congratulations':
      popup = <CongratulationsPopup />;
      break;
    case 'congratulationsVerify':
      popup = <CongratulationsVerifyPopup />;
      break;
    case 'logout':
      popup = <LogoutPopup />;
      break;
    case 'resetPassword':
      popup = <ResetPasswordPopup />;
      break;
    case 'passwordOtp':
      popup = <PasswordOtpPopup />;
      break;
    case 'verifyOtp':
      popup = <VerifyOtpPopup />;
      break;
    case 'changeOtp':
      popup = <ChangeOtpPopup />;
      break;
    default:
      popup = null;
  }

  return popup ? (
    <PopupSlide isOpen={true} handleClose={router.back}>
      {popup}
    </PopupSlide>
  ) : null;
};

const PopupSlide = dynamic(() => import('./components/PopupSlide'), {
  ssr: false,
});


const CongratulationsPopup = dynamic(() => import('./CongratulationsPopup'), {
  ssr: false,
});

const CongratulationsVerifyPopup = dynamic(
  () => import('./CongratulationsVerifyPopup'),
  {
    ssr: false,
  },
);

const LogoutPopup = dynamic(() => import('./LogoutPopup'), {
  ssr: false,
});

const ResetPasswordPopup = dynamic(() => import('./ResetPasswordPopup'), {
  ssr: false,
});

const PasswordOtpPopup = dynamic(() => import('./PasswordOtpPopup'), {
  ssr: false,
});

const VerifyOtpPopup = dynamic(() => import('./VerifyOtpPopup'), {
  ssr: false,
});

const ChangeOtpPopup = dynamic(() => import('./ChangeOtpPopup'), {
  ssr: false,
});
