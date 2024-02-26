import styles from './WhyUs.module.scss';
import Image from 'next/image';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { Tab } from '@material-ui/core';
import { Trans } from 'next-i18next';
import { MobileStores } from './MobileStores';
import WhyUsBackground from '../../../common/assets/svg/fundraising/WhyUsBackground.svg';
import WhyUsPopCorn from '../../../common/assets/png/fundraising/WhyUsPopCorn.png';
import WhyUsDrink from '../../../common/assets/png/fundraising/WhyUsDrink.png';
import WhyUsSecondBackground from '../../../common/assets/svg/fundraising/WhyUsSecondBackground.svg';
import WhyUsPhone from '../../../common/assets/png/fundraising/WhyUsPhone.png';
import { useState } from 'react';
import { useIntersection } from '../../../common/helpers/hooks/useIntersection';
import { useTranslationLock } from '../../../common/helpers/hooks/useTranslationLock';

export const WhyUs = () => {
  const { t, i18n } = useTranslationLock('default');
  const [value, handleChange] = useState('1');
  useIntersection('.' + styles.whyUsImage, styles.whyUsAnimation);

  return (
    <div className={styles.whyUs}>
      <div className={styles.whyUsImage}>
        <WhyUsBackground />
        <Image
          className={styles.whyUsPopcorn}
          src={WhyUsPopCorn}
          alt={'popcorn'}
        />
        <Image className={styles.whyUsDrink} src={WhyUsDrink} alt={'drink'} />
        <WhyUsSecondBackground className={styles.whyUsSecondBackground} />
        <Image className={styles.whyUsPhone} src={WhyUsPhone} alt={'phone'} />
      </div>
      <div className={styles.whyUsTabs}>
        <TabContext value={value}>
          <TabList
            variant="fullWidth"
            onChange={(e, value) => handleChange(value)}
          >
            <Tab
              disableRipple
              label={t('fundraiser.whyUs.tabs.forFans')}
              value="1"
            />
            <Tab
              disableRipple
              label={t('fundraiser.whyUs.tabs.forCreators')}
              value="2"
            />
          </TabList>
          <TabPanel value="1">
            <ul>
              <Trans i18nKey={`fundraiser.whyUs.tabs.forFansList`} i18n={i18n}>
                {t(`fundraiser.whyUs.tabs.forFansList`)}
                <li />
              </Trans>
            </ul>
          </TabPanel>
          <TabPanel value="2">
            <ul>
              <Trans
                i18nKey={`fundraiser.whyUs.tabs.forCreatorsList`}
                i18n={i18n}
              >
                {t(`fundraiser.whyUs.tabs.forCreatorsList`)}
                <li />
              </Trans>
            </ul>
          </TabPanel>
        </TabContext>
        <MobileStores className={styles.whyUsMobileStores} />
      </div>
    </div>
  );
};
