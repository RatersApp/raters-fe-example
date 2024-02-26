import React from 'react';
import Popup from './components/Popup';
import CloseButtonIcon from '../../assets/svg/closeButton.svg';
import { Box, ButtonBase, Hidden, Typography } from '@material-ui/core';
import AppleLogo from '../../../features/Landing/static/assets/img/footer/logos/apple.png';
import PlayMarketLogo from '../../../features/Landing/static/assets/img/footer/logos/android.png';
import { useTranslation } from 'next-i18next';
import iphonemob from '../../assets/png/iphonemob.png';

import androidScreen from '../../assets/png/Galaxy.png';
import { APP_STORE_APP_LINK, PLAY_STORE_APP_LINK } from '../../config/strings';
import { detect } from 'detect-browser';
import Image from 'next/image';

const GetProPopup = ({ isOpen, handleClose }) => {
  const { t } = useTranslation();
  const browser = detect();
  return (
    <Popup isOpen={isOpen} handleClose={handleClose}>
      <div className={'proPopUpWrapper'}>
        <div style={{ position: 'absolute', top: 15, right: 0 }}>
          <button
            onClick={handleClose}
            type="button"
            className="closeButtonIcon"
          >
            <CloseButtonIcon />
          </button>
        </div>
        <Typography className={'proPopupTitle'}>
          {t('Upgrade.Title')}
        </Typography>
        <Typography className={'proPopupDescription'}>
          {t('Upgrade.WebDisclaimer')}
        </Typography>
        <div>
          <Hidden xsDown>
            <div className={'proPopupContent'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Box className="platformLink">
                  <Image src={AppleLogo} alt={'apple'} width={20} height={20} />
                  <Typography className="platformItem">
                    {t('Web.AvailableIOS')}
                  </Typography>
                </Box>
                <Box className="phoneProPopupContainer">
                  <Image
                    src={iphonemob}
                    alt="iphone screen"
                    width={120}
                    height={217}
                  />
                </Box>
                <ButtonBase
                  className="statisticShareButton"
                  style={{ marginTop: '20px' }}
                  href={APP_STORE_APP_LINK}
                  target="_blank"
                >
                  {t('Web.GetApp')}
                </ButtonBase>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Box className="platformLink">
                  <Image
                    src={PlayMarketLogo}
                    alt={'playMarket'}
                    width={20}
                    height={20}
                  />
                  <Typography className="platformItem">
                    {t('Web.AvailableAndroid')}
                  </Typography>
                </Box>
                <Box className="phoneProPopupContainer">
                  <Image src={androidScreen} alt="android screen" />
                </Box>
                <ButtonBase
                  className="statisticShareButton"
                  style={{ marginTop: '20px' }}
                  href={PLAY_STORE_APP_LINK}
                  target="_blank"
                >
                  {t('Web.GetApp')}
                </ButtonBase>
              </div>
            </div>
          </Hidden>
          <Hidden smUp>
            <div className={'proPopupContent'}>
              {browser.os === 'iOS' ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Box className="platformLink">
                    <Image src={AppleLogo} alt={'apple'} />
                    <Typography className="platformItem">
                      {t('Web.AvailableIOS')}
                    </Typography>
                  </Box>
                  <Box className="phoneProPopupContainer">
                    <Image
                      src={iphonemob}
                      alt="iphone screen"
                      width={120}
                      height={217}
                    />
                  </Box>
                  <ButtonBase
                    className="statisticShareButton"
                    style={{ marginTop: '20px', width: '160px' }}
                    href={APP_STORE_APP_LINK}
                    target="_blank"
                  >
                    {t('Web.GetApp')}
                  </ButtonBase>
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Box className="platformLink">
                    <Image src={PlayMarketLogo} alt={'playMarket'} />
                    <Typography className="platformItem">
                      {t('Web.AvailableAndroid')}
                    </Typography>
                  </Box>
                  <Box className="phoneProPopupContainer">
                    <Image src={androidScreen} alt="android screen" />
                  </Box>
                  <ButtonBase
                    className="statisticShareButton"
                    style={{ marginTop: '20px', width: '160px' }}
                    href={PLAY_STORE_APP_LINK}
                    target="_blank"
                  >
                    {t('Web.GetApp')}
                  </ButtonBase>
                </div>
              )}
            </div>
          </Hidden>
        </div>
      </div>
    </Popup>
  );
};

export default GetProPopup;
