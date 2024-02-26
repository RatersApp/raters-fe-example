import { useTranslation } from 'next-i18next';
import Cup from '../../assets/svg/auth/Cup.svg';
import AuthPopup from './components/AuthPopup';

export default function CongratulationsPopup() {
  const { t } = useTranslation();

  return (
    <AuthPopup
      title={t('Popup.congratulations.title')}
      description={t('Popup.congratulations.description')}
      Icon={Cup}
      buttonText={t('Popup.congratulations.buttonText')}
    />
  );
}
