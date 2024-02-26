import styles from './TimeTiFindMovie.module.scss';
import { Typography } from '@material-ui/core';
import Background187hours from '../../../common/assets/svg/fundraising/Background187hours.svg';
import Background187hoursCard from '../../../common/assets/svg/fundraising/Background187hoursCard.svg';
import { Trans } from 'next-i18next';
import { useTranslationLock } from '../../../common/helpers/hooks/useTranslationLock';

export const TimeToFindMovie = () => {
  const { t, i18n } = useTranslationLock('default');

  return (
    <>
      <Typography className={styles._187hoursTitle}>
        <Trans i18n={i18n}>
          {t(`fundraiser.timeToFindMovie.title`)}
          <span className={styles._187hoursTitleColored} />
        </Trans>
      </Typography>
      <div className={styles._187Cards}>
        <Background187hours />
        <div>
          <Background187hoursCard />
          <Typography>
            {t('fundraiser.timeToFindMovie.card.sameSituation')}
          </Typography>
        </div>
        <span className={styles._187hoursSeparator} />
        <div>
          <Background187hoursCard />
          <Typography>
            {t('fundraiser.timeToFindMovie.card.critics')}
          </Typography>
        </div>
        <span className={styles._187hoursSeparator} style={{ flex: 6 }} />
        <div>
          <Background187hoursCard />
          <Typography>
            {t('fundraiser.timeToFindMovie.card.askFriends')}
          </Typography>
        </div>
        <span className={styles._187hoursSeparator} />
        <div>
          <Background187hoursCard />
          <Typography>{t('fundraiser.timeToFindMovie.card.why')}</Typography>
        </div>
      </div>
      <Typography className={styles._187hoursDescription}>
        {t('fundraiser.timeToFindMovie.explanation')}
      </Typography>
    </>
  );
};
