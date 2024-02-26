import styles from './Main.module.scss';
import { Typography } from '@material-ui/core';
import Polygon from '../../../common/assets/svg/fundraising/polygon.svg';
import { Socials } from './Socials';
import Image from 'next/image';
import LandingPhone from '../../../common/assets/png/fundraising/LandingPhone.png';
import LandingPhoneWednesday from '../../../common/assets/png/fundraising/LandingPhoneWednesday.png';
import LandingPhoneStarWars from '../../../common/assets/png/fundraising/LandingPhoneStarWars.png';
import { useEffect } from 'react';
import { useTranslationLock } from '../../../common/helpers/hooks/useTranslationLock';

export const Main = () => {
  const { t } = useTranslationLock('default');
  useEffect(() => {
    document
      .querySelectorAll(`.${styles.phone} img:nth-of-type(n + 2)`)
      .forEach((el) => {
        setTimeout(() => el.classList.add(styles.landingPhoneAnimation), 500);
      });
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.mainTitleContainer}>
        <Typography className={styles.mainTitle}>
          {t('fundraiser.main.title')}
        </Typography>
        <Typography className={styles.mainDescription}>
          {t('fundraiser.main.description')}
        </Typography>
        <div className={styles.socialsContainer}>
          <div style={{ width: 176 }}>
            <Typography className={styles.socialTitle}>
              {t('fundraiser.main.powered')}
            </Typography>
            <Polygon style={{ marginLeft: -8 }} />
          </div>
          <div>
            <Typography className={styles.socialTitle}>
              {t('fundraiser.main.socials')}
            </Typography>
            <Socials className={styles.socials} />
          </div>
        </div>
      </div>
      <div className={styles.phone}>
        <div>
          <Image alt="phone" src={LandingPhone} />
          <Image alt="wednesday" src={LandingPhoneWednesday} />
          <Image alt="starWars" src={LandingPhoneStarWars} />
        </div>
      </div>
    </div>
  );
};
