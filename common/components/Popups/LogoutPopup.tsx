import styles from './queryPopups.module.scss';
import { PopupWrapper } from './components/PopupWrapper';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import { MainButton } from '../Buttons/MainButton';
import classNames from 'classnames';
import { openSans } from '../../../pages/_app';
import { authApiClient } from '../../api/authApiClient';

export default function LogoutPopup() {
  const { t } = useTranslation();
  const [handleLogout] = authApiClient.useLogoutMutation();

  return (
    <PopupWrapper>
      <Typography className={styles.title}>{t('Settings.LogOut')}</Typography>
      <Typography
        className={classNames([styles.description, openSans.className])}
      >
        {t('Settings.LogOut.description')}
      </Typography>
      <MainButton
        className={styles.button}
        text={t('Settings.LogOut')}
        onClick={() => handleLogout()}
      />
    </PopupWrapper>
  );
}
