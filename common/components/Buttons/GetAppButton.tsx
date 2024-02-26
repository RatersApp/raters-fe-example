import React, { useState } from 'react';
import {
  Box,
  Divider,
  Link,
  ListItemIcon,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import StyledMenu from '../Menu/StyledMenu';
import StyledMenuItem from '../Menu/StyledMenuItem';
import { APP_STORE_APP_LINK, PLAY_STORE_APP_LINK } from '../../config/strings';
import { dataLayerPush } from '../../helpers/dataLayerHelper';
import Image from 'next/image';
import cls from 'classnames';
import { openSans } from '../../../pages/_app';

export default function GetAppButton() {
  const [anchorEl, setAnchorEl] = useState(false);
  const { t } = useTranslation();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    dataLayerPush('get_app_click');
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Typography className={'signInHeaderButton'} onClick={handleMenuClick}>
        {t('Web.GetApp')}
      </Typography>
      <StyledMenu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <StyledMenuItem>
          <Link
            rel="noopener"
            className={cls('disabledCSSLink', openSans.className)}
            underline="none"
            href={APP_STORE_APP_LINK}
          >
            {t('Web.DownloadIOS')}
          </Link>
        </StyledMenuItem>
        <Divider />
        <StyledMenuItem>
          <Link
            rel="noopener"
            className={cls('disabledCSSLink', openSans.className)}
            underline="none"
            href={PLAY_STORE_APP_LINK}
          >
            {t('Web.DownloadAndroid')}
          </Link>
        </StyledMenuItem>
      </StyledMenu>
    </Box>
  );
}
