import styles from './FundraiserPage.module.scss';
import Background from '../../common/assets/svg/fundraising/BackgroundLanding.svg';
import BackgroundMobile from '../../common/assets/svg/fundraising/BackgroundLandingMobile.svg';
import { Typography } from '@material-ui/core';
import Image from 'next/image';
import InfoCamera from '../../common/assets/png/fundraising/InfoCamera.png';
import { MobileStores } from './components/MobileStores';
import GraphTokenPriceAndMau from '../../common/assets/svg/fundraising/GraphTokenPriceAndMau.svg';
import GraphTokenPriceAndMauMobile from '../../common/assets/svg/fundraising/GraphTokenPriceAndMauMobile.svg';
import GraphTokenAllocation from '../../common/assets/svg/fundraising/GraphTokenAllocation.svg';
import GraphTokenAllocationPie from '../../common/assets/svg/fundraising/GraphTokenAllocationPie.svg';
import GraphPlatformSupply from '../../common/assets/svg/fundraising/GraphPlatformSupply.svg';
import GraphPlatformSupplyMobile from '../../common/assets/svg/fundraising/GraphPlatformSupplyMobile.svg';
import Footer from '../../features/Landing/sections/Footer';
import Newsletter from '../../features/Landing/sections/Newsletter';
import { Team } from './components/Team';
import { useIntersection } from '../../common/helpers/hooks/useIntersection';
import { GetToken } from './components/GetToken';
import { Main } from './components/Main';
import { TokenUtility } from './components/TokenUtility';
import { TimeToFindMovie } from './components/TimeToFindMovie';
import { WhyUs } from './components/WhyUs';
import { Kpi } from './components/Kpi';
import { Roadmap } from './components/Roadmap';
import { useTranslationLock } from '../../common/helpers/hooks/useTranslationLock';

export const FundraiserPage = () => {
  const { t } = useTranslationLock('default');
  useIntersection('.' + styles.tokenomicsContainer, styles.pieAnimation);

  return (
    <div className={styles.landingParallax}>
      <Background className={styles.landingBackground} />
      <BackgroundMobile className={styles.landingBackgroundMobile} />
      <div className={styles.landingContent}>
        <Main />
        <MobileStores className={styles.mobileStores} />
        <Typography className={styles.getTokenAppText}>
          {t('fundraiser.getToken.appText')}
        </Typography>
        <Typography className={styles.getTokenTitle}>
          {t('fundraiser.getToken.title')}
        </Typography>
        <Typography className={styles.landingSubtitle}>
          {t('fundraiser.getToken.description')}
        </Typography>
        <GetToken />
        <Typography className={styles.tokenUtilityTitle}>
          {t('fundraiser.tokenUtility.title')}
        </Typography>
        <Typography className={styles.landingSubtitle}>
          {t('fundraiser.tokenUtility.description')}
        </Typography>
        <TokenUtility />
        <TimeToFindMovie />
        <div className={styles.info}>
          <Typography>{t('fundraiser.info.title')}</Typography>
          <Image src={InfoCamera} alt={'info'} width={307} height={320} />
        </div>
        <Typography className={styles.whyUsTitle}>
          {t('fundraiser.whyUs.title')}
        </Typography>
        <Typography className={styles.landingSubtitle}>
          {t('fundraiser.whyUs.description')}
        </Typography>
        <WhyUs />
        <Typography className={styles.kpiTitle}>
          {t('fundraiser.kpi.title')}
        </Typography>
        <Typography className={styles.landingSubtitle}>
          {t('fundraiser.kpi.description')}
        </Typography>
        <Kpi />
        <Typography className={styles.tokenSaleRoundsTitle}>
          {t('fundraiser.saleRounds.title')}
        </Typography>
        <Typography className={styles.landingSubtitle}>
          {t('fundraiser.saleRounds.description')}
        </Typography>
        <div className={styles.tokenSaleRoundsContainer}>
          <div>
            <Typography>
              {t('fundraiser.saleRounds.tokenPrice.title')}
            </Typography>
            <div className={styles.tokenSaleRoundsLegend}>
              <div className={styles.tokenSaleRoundsPrice}>
                <div />
                <Typography>
                  {t('fundraiser.saleRounds.tokenPrice.rate')}
                </Typography>
              </div>
              <div className={styles.graphLegendBlue}>
                <div>
                  <div />
                </div>
                <Typography>
                  {t('fundraiser.saleRounds.tokenPrice.users')}
                </Typography>
              </div>
            </div>
          </div>
          <GraphTokenPriceAndMau />
          <GraphTokenPriceAndMauMobile />
          <div className={styles.tokenSaleRoundsLegendMobile}>
            <div className={styles.tokenSaleRoundsPrice}>
              <div />
              <Typography>
                {t('fundraiser.saleRounds.tokenPrice.rate')}
              </Typography>
            </div>
            <div className={styles.graphLegendBlue}>
              <div>
                <div />
              </div>
              <Typography>
                {t('fundraiser.saleRounds.tokenPrice.users')}
              </Typography>
            </div>
          </div>
        </div>
        <Typography className={styles.roadmapTitle}>
          {t('fundraiser.roadmap.title')}
        </Typography>
        <Typography className={styles.landingSubtitle}>
          {t('fundraiser.roadmap.description')}
        </Typography>
        <Roadmap />
        <Typography className={styles.tokemonicsTitle}>
          {t('fundraiser.tokenomics.title')}
        </Typography>
        <Typography className={styles.landingSubtitle}>
          {t('fundraiser.tokenomics.description')}
        </Typography>
        <div className={styles.tokenomicsContainer}>
          <div>
            <Typography>{t('fundraiser.tokenomics.allocation')}</Typography>
            <Typography>
              {t('fundraiser.tokenomics.allocationDescription')}
            </Typography>
            <div>
              <GraphTokenAllocation />
              <GraphTokenAllocationPie />
            </div>
          </div>
          <div>
            <Typography>{t('fundraiser.tokenomics.forecast')}</Typography>
            <Typography>
              {t('fundraiser.tokenomics.forecastDescription')}
            </Typography>
            <GraphPlatformSupply />
            <GraphPlatformSupplyMobile />
          </div>
        </div>
        <Typography className={styles.teamTitle}>
          {t('fundraiser.team.title')}
        </Typography>
        <Typography className={styles.landingSubtitle}>
          {t('fundraiser.team.description')}
        </Typography>
        <Team />
      </div>
      <div className={styles.landingFooter}>
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
};
