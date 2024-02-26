import styles from './Kpi.module.scss';
import { Typography } from '@material-ui/core';
import LandingUsa from '../../../common/assets/svg/fundraising/LandingUsa.svg';
import KpiMona from '../../../common/assets/svg/fundraising/KpiMona.svg';
import Image from 'next/image';
import KpiNewChip from '../../../common/assets/png/fundraising/KpiNewChip.png';
import GraphMonthlyActiveUsers from '../../../common/assets/svg/fundraising/GraphMonthlyActiveUsers.svg';
import GraphDataPoints from '../../../common/assets/svg/fundraising/GraphDataPoints.svg';
import GraphAnnualRevenue from '../../../common/assets/svg/fundraising/GraphAnnualRevenue.svg';
import { Trans } from 'next-i18next';
import React from 'react';
import { Link } from '@mui/material';
import { useTranslationLock } from '../../../common/helpers/hooks/useTranslationLock';

export const Kpi = () => {
  const { t, i18n } = useTranslationLock('default');

  return (
    <div className={styles.kpiContainer}>
      <div>
        <div className={styles.kpiAchievements}>
          <Typography className={styles.kpiSectionTitle}>
            {t('fundraiser.kpi.achievements.title')}
          </Typography>
          <div>
            <div>
              <div>
                <Typography>
                  {t('fundraiser.kpi.achievements.roundsCount')}
                </Typography>
              </div>
              <Typography>{t('fundraiser.kpi.achievements.rounds')}</Typography>
            </div>
            <div>
              <div>
                <Typography>
                  {t('fundraiser.kpi.achievements.platformsCount')}
                </Typography>
              </div>
              <Typography>
                {t('fundraiser.kpi.achievements.platforms')}
              </Typography>
            </div>
            <div>
              <div>
                <LandingUsa />
              </div>
              <Typography>
                {t('fundraiser.kpi.achievements.patents')}
              </Typography>
            </div>
            <div>
              <div>
                <Typography>
                  {t('fundraiser.kpi.achievements.agreementsCount')}
                </Typography>
              </div>
              <Typography>
                {t('fundraiser.kpi.achievements.agreements')}
              </Typography>
            </div>
            <div>
              <div>
                <KpiMona />
              </div>
              <Typography>
                <Trans i18n={i18n}>
                  {t(`fundraiser.kpi.achievements.mona`)}
                  <Link
                    href={
                      'https://www.prdistribution.com/news/london-based-company-raters-acquires-a-competitive-movie-platform-mona/9085344#'
                    }
                    target="_blank"
                  />
                </Trans>
              </Typography>
            </div>
            <div>
              <div>
                <Image src={KpiNewChip} alt={'chip'} />
              </div>
              <Typography>
                {t('fundraiser.kpi.achievements.accelerator')}
              </Typography>
            </div>
          </div>
        </div>
        <div className={styles.kpiSelected}>
          <Typography className={styles.kpiSectionTitle}>
            {t('fundraiser.kpi.selected.title')}
          </Typography>
          <div>
            <Typography>{t('fundraiser.kpi.selected.usersCount')}</Typography>
            <Typography>{t('fundraiser.kpi.selected.users')}</Typography>
          </div>
          <div>
            <Typography>
              {t('fundraiser.kpi.selected.countriesCount')}
            </Typography>
            <Typography>{t('fundraiser.kpi.selected.countries')}</Typography>
          </div>
          <div>
            <Typography>{t('fundraiser.kpi.selected.hoursCount')}</Typography>
            <Typography>{t('fundraiser.kpi.selected.hours')}</Typography>
          </div>
        </div>
      </div>
      <div className={styles.kpiGraphs}>
        <div>
          <Typography>{t('fundraiser.kpi.graphs.mothly.title')}</Typography>
          <GraphMonthlyActiveUsers />
        </div>
        <div>
          <Typography>{t('fundraiser.kpi.graphs.dataPoints.title')}</Typography>
          <GraphDataPoints />
        </div>
        <div>
          <Typography>{t('fundraiser.kpi.graphs.revenue.title')}</Typography>
          <GraphAnnualRevenue />
        </div>
      </div>
    </div>
  );
};
