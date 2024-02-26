import styles from './GetToken.module.scss';
import { Grid, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Typography } from '@material-ui/core';
import GetTokeAccount from '../../../common/assets/svg/fundraising/GetTokenAccount.svg';
import GetTokenMovie from '../../../common/assets/svg/fundraising/GetTokenMovie.svg';
import GetTokenSocial from '../../../common/assets/svg/fundraising/GetTokenSocial.svg';
import GetTokenRecommendations from '../../../common/assets/svg/fundraising/GetTokenRecommendations.svg';
import { useTranslationLock } from '../../../common/helpers/hooks/useTranslationLock';

export const GetToken = () => {
  const { t } = useTranslationLock('default');

  return (
    <Swiper
      className={styles.getTokenCards}
      spaceBetween={10}
      grid={{ rows: 1 }}
      pagination={{ clickable: true }}
      modules={[Grid, Pagination]}
      breakpoints={{
        611: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          grid: { rows: 2, fill: 'row' },
          spaceBetween: 30,
        },
        1351: { slidesPerView: 4, grid: { rows: 1 }, spaceBetween: 22 },
      }}
    >
      {getTokenData.map(({ icon, tKeyPrefix }) => (
        <SwiperSlide key={tKeyPrefix}>
          <div>
            <div />
            {icon}
          </div>
          <Typography>
            {t(`fundraiser.getToken.card.${tKeyPrefix}.title`)}
          </Typography>
          <Typography>
            {t(`fundraiser.getToken.card.${tKeyPrefix}.description`)}
          </Typography>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const getTokenData = [
  {
    icon: <GetTokeAccount />,
    tKeyPrefix: 'activity',
  },
  {
    icon: <GetTokenMovie />,
    tKeyPrefix: 'movie',
  },
  {
    icon: <GetTokenSocial style={{ marginBottom: 4 }} />,
    tKeyPrefix: 'social',
  },
  {
    icon: <GetTokenRecommendations style={{ marginRight: 2 }} />,
    tKeyPrefix: 'recommendations',
  },
] as const;
