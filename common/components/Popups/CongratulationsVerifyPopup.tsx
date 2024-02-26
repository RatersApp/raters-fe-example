import { useTranslation } from 'next-i18next';
import Cup from '../../assets/svg/auth/Cup.svg';
import AuthPopup from './components/AuthPopup';

export default function CongratulationsVerifyPopup() {
  const { t } = useTranslation();

  return (
    <AuthPopup
      title={t('Popup.congratulationsVerify.title')}
      description={t('Popup.congratulationsVerify.description')}
      Icon={Cup}
      buttonText={t('Popup.congratulationsVerify.buttonText')}
    />
  );
}
