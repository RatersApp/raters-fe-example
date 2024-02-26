import React, { memo, useCallback, useState } from 'react';
import {
  ButtonBase,
  Divider,
  Menu,
  MenuItem,
  Snackbar,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import { TwitterShareButton } from 'react-share';
import ShareOnTwitterIcon from '../../assets/svg/TwitterLogo.svg';
import ShareViaEmailIcon from '../../assets/svg/ShareEMailLogoSmall.svg';
import CopyLinkIcon from '../../assets/svg/CopyLinkIcon.svg';
import MuiAlert from '@material-ui/lab/Alert';
import handleCopyToClipBoard from '../../helpers/handleCopyToClipboard';
import type { SnackbarCloseReason } from '@mui/material';
import { FBShare } from './FBShare';

interface IProps {
  anchorEl: Element;
  handleClose: () => void;
  refUrl: string;
  mailtoString: string;
}

function StyledShare({ anchorEl, handleClose, refUrl, mailtoString }: IProps) {
  const { t } = useTranslation();
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopy = useCallback(() => {
    handleCopyToClipBoard(refUrl);
    setLinkCopied(true);
  }, [linkCopied, refUrl]);

  const handleCloseSnackBar = useCallback(
    (event: unknown, reason?: SnackbarCloseReason) => {
      if (reason === 'clickaway') {
        return;
      }

      setLinkCopied(false);
    },
    [linkCopied],
  );

  return (
    <>
      <Menu
        className="shareMenuBox"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <FBShare href={refUrl} />
        <Divider />
        <MenuItem className="shareMenuItem">
          <TwitterShareButton url={refUrl}>
            <ButtonBase className="centered">
              <ShareOnTwitterIcon />
              <Typography className="shareText">
                {t('Web.ShareTwitter')}
              </Typography>
            </ButtonBase>
          </TwitterShareButton>
        </MenuItem>
        <Divider />
        <MenuItem className="shareMenuItem">
          <ButtonBase className="centered">
            <a href={`mailto:${mailtoString}`} className="disabledCSSLink">
              <div
                style={{
                  padding: '0 3px',
                }}
              >
                <ShareViaEmailIcon />
              </div>
              <Typography className="shareText">
                {t('Web.ShareEmail')}
              </Typography>
            </a>
          </ButtonBase>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleCopy} className="shareMenuItem">
          <ButtonBase className="centered">
            <div
              style={{
                padding: '0 3px',
              }}
            >
              <CopyLinkIcon />
            </div>
            <Typography className="shareText">{t('Web.ShareLink')}</Typography>
          </ButtonBase>
        </MenuItem>
      </Menu>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={linkCopied}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
      >
        <MuiAlert
          className="copyLinkAlert"
          icon={false}
          square={false}
          elevation={6}
          variant="filled"
          color="success"
          onClose={handleCloseSnackBar}
          severity="success"
        >
          <Typography className="alertContent">Copied to clipboard</Typography>
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default memo(StyledShare);
