import { ButtonBase, MenuItem, Typography } from '@material-ui/core';
import ShareOnFacebookIcon from '../../assets/svg/FaceBookLogoFilled.svg';
import React from 'react';
import { useShare } from 'react-facebook';
import { useTranslation } from 'next-i18next';

export const FBShare = ({ href }: { href: string }) => {
  const { t } = useTranslation();
  const { share } = useShare();

  return (
    <MenuItem className="shareMenuItem">
      <ButtonBase
        className="centered"
        onClick={() => share({ display: 'popup', href })}
      >
        <div
          style={{
            padding: '0 7px',
          }}
        >
          <ShareOnFacebookIcon />
        </div>
        <Typography className="shareText">
          {t('Rating.ShareFacebook')}
        </Typography>
      </ButtonBase>
    </MenuItem>
  );
};
