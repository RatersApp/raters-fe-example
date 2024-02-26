import styles from './Roadmap.module.scss';
import { Typography } from '@material-ui/core';
import BackgroundRoadmap from '../../../common/assets/svg/fundraising/BackgroundRoadmap.svg';
import BackgroundRoadmapTablet from '../../../common/assets/svg/fundraising/BackgroundRoadmapTablet.svg';
import BackgroundRoadmapMobile from '../../../common/assets/svg/fundraising/BackgroundRoadmapMobile.svg';
import BackgroundRoadmapCard from '../../../common/assets/svg/fundraising/BackgroundRoadmapCard.svg';
import { useTranslationLock } from '../../../common/helpers/hooks/useTranslationLock';
import { useIntersection } from '../../../common/helpers/hooks/useIntersection';

export const Roadmap = () => {
  const { t } = useTranslationLock('default');
  useIntersection('.' + styles.roadmapContainer, styles.roadmapAnimation);

  return (
    <div className={styles.roadmapContainer}>
      <BackgroundRoadmap />
      <BackgroundRoadmapTablet />
      <BackgroundRoadmapMobile />
      <div>
        {roadmapData.slice(0, 6).map((tKeyPrefix) => (
          <div key={tKeyPrefix}>
            <BackgroundRoadmapCard />
            <Typography>
              {t(`fundraiser.roadmap.cards.${tKeyPrefix}`)}
            </Typography>
            <Typography>
              {t(`fundraiser.roadmap.cards.${tKeyPrefix}.date`)}
            </Typography>
          </div>
        ))}
      </div>
      <div>
        {roadmapData.slice(6).map((tKeyPrefix) => (
          <div key={tKeyPrefix}>
            <BackgroundRoadmapCard />
            <Typography>
              {t(`fundraiser.roadmap.cards.${tKeyPrefix}`)}
            </Typography>
            <Typography>
              {t(`fundraiser.roadmap.cards.${tKeyPrefix}.date`)}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

const roadmapData = [1, 3, 5, 2, 4, 6, 7, 9, 11, 8, 10, 12] as const;
