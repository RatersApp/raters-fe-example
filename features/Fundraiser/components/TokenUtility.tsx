import styles from './TokenUtility.module.scss';
import Image from 'next/image';
import TokenUtilityRecommendations from '../../../common/assets/png/fundraising/TokenUtilityRecommendations.png';
import { Typography } from '@material-ui/core';
import TokenUtilityPro from '../../../common/assets/png/fundraising/TokenUtilityPro.png';
import TokenUtilityRewards from '../../../common/assets/png/fundraising/TokenUtilityRewards.png';
import TokenUtilityNft from '../../../common/assets/png/fundraising/TokenUtilityNft.png';
import { Grid, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslationLock } from '../../../common/helpers/hooks/useTranslationLock';

export const TokenUtility = () => {
  const { t } = useTranslationLock('default');

  return (
    <Swiper
      className={styles.tokenUtilityCards}
      spaceBetween={10}
      grid={{ rows: 1 }}
      pagination={{ clickable: true }}
      modules={[Grid, Pagination]}
      breakpoints={{
        611: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          grid: { rows: 4, fill: 'row' },
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          grid: { rows: 2, fill: 'row' },
          spaceBetween: 30,
        },
      }}
    >
      {tokenUtilityData.map(({ img, tKeyPrefix }) => (
        <SwiperSlide key={tKeyPrefix}>
          <Image src={img} alt={tKeyPrefix} />
          <div>
            <Typography>
              {t(`fundraiser.tokenUtility.card.${tKeyPrefix}.title`)}
            </Typography>
            <Typography>
              {t(`fundraiser.tokenUtility.card.${tKeyPrefix}.description`)}
            </Typography>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const tokenUtilityData = [
  {
    img: TokenUtilityRecommendations,
    tKeyPrefix: 'recommendations',
  },
  {
    img: TokenUtilityPro,
    tKeyPrefix: 'pro',
  },
  {
    img: TokenUtilityRewards,
    tKeyPrefix: 'rewards',
  },
  {
    img: TokenUtilityNft,
    tKeyPrefix: 'nft',
  },
] as const;
