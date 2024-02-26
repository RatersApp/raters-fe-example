import styles from './Team.module.scss';
import Rasim from '../../../common/assets/png/fundraising/Rasim.png';
import LandingUk from '../../../common/assets/svg/fundraising/LandingUk.svg';
import Oleg from '../../../common/assets/png/fundraising/Oleg.png';
import LandingUa from '../../../common/assets/svg/fundraising/LandingUa.svg';
import Tural from '../../../common/assets/png/fundraising/Tural.png';
import LandingAz from '../../../common/assets/svg/fundraising/LandingAz.svg';
import Jamil from '../../../common/assets/png/fundraising/Jamil.png';
import Yurii from '../../../common/assets/png/fundraising/Yurii.png';
import Yevhenii from '../../../common/assets/png/fundraising/Yevhenii.png';
import Finn from '../../../common/assets/png/fundraising/Finn.png';
import SeeMore from '../../../common/assets/svg/fundraising/SeeMore.svg';
import { TeamCard } from './TeamCard';
import { useState } from 'react';
import { useWindowSizeListener } from '../../../common/helpers/hooks/useWindowSize';
import { MainButton } from '../../../common/components/Buttons/MainButton';
import { Typography } from '@material-ui/core';
import cls from 'classnames';

export const Team = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [shortHeight, setShortHeight] = useState(990);
  useWindowSizeListener((width) => {
    setIsDesktop(width > 953);
    const thirdElement = document.querySelector<HTMLElement>(
      `.${styles.teamContainer}>div>div:nth-of-type(4)`,
    );
    if (thirdElement) {
      setShortHeight(Math.round(thirdElement.offsetTop / 10) * 10 + 30);
    }
  });

  return (
    <div
      className={cls(
        styles.teamContainer,
        !isDesktop && !isFull ? styles.teamContainerShort : undefined,
      )}
    >
      <div
        style={{
          maxHeight: !isDesktop && !isFull ? shortHeight : undefined,
        }}
      >
        {teamData.map((el) => (
          <TeamCard key={el.tKeyPrefix} {...el} />
        ))}
      </div>
      {!isDesktop && (
        <MainButton
          variant={'outlined'}
          onClick={() => setIsFull((prev) => !prev)}
        >
          <Typography className={'mainOutlinedButtonText'}>
            {isFull ? 'Hide' : 'See all'}
          </Typography>
          <SeeMore
            style={{ marginLeft: 10, ...(isFull ? { rotate: '180deg' } : {}) }}
          />
        </MainButton>
      )}
    </div>
  );
};

const teamData = [
  {
    avatar: Rasim,
    Country: LandingUk,
    tKeyPrefix: 'Rasim',
    links: ['https://ninka.az/', 'https://en-io.com/'],
  },
  {
    avatar: Oleg,
    Country: LandingUa,
    tKeyPrefix: 'Oleg',
  },
  {
    avatar: Tural,
    Country: LandingAz,
    tKeyPrefix: 'Tural',
    links: ['https://www.ivi.tv/'],
  },
  {
    avatar: Jamil,
    Country: LandingUk,
    tKeyPrefix: 'Jamil',
  },
  {
    avatar: Yurii,
    Country: LandingUa,
    tKeyPrefix: 'Yurii',
    links: ['https://impleum.com/'],
  },
  {
    avatar: Yevhenii,
    Country: LandingUa,
    tKeyPrefix: 'Yevhenii',
  },
  {
    avatar: Finn,
    Country: LandingUk,
    tKeyPrefix: 'Finn',
  },
] as const;
