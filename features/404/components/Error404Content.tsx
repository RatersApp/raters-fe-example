import React from 'react';
import { Typography } from '@mui/material';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import Helmet404 from '../../../common/assets/png/Helmet404.png';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { openSans } from '../../../pages/_app';

const Error404Content = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className={'error404ContentContainer'}>
      <div className={'error404ContentContainerHead'}>
        <Typography className={'error404ContentContainerHeadText'}>
          {t('404.Text')}
        </Typography>
        <Button
          color="primary"
          style={{ textTransform: 'none', maxWidth: '153px' }}
          onClick={() => router.push('/')}
          className="postReviewButton"
          variant="contained"
        >
          {t('404.Button')}
        </Button>
      </div>
      <div className={'error404ContentContainerCenter'}>
        <Typography className={'error404BigText'}>4</Typography>
        <Image alt={'Iron man'} className={'error404Image'} src={Helmet404} />
        <Typography className={'error404BigText'}>4</Typography>
      </div>
      <div
        className={classNames([
          'error404ContentContainerBottom',
          openSans.className,
        ])}
      >
        <Typography>
          {t('404.ExternalLink.Part1')}{' '}
          <Link href={'/movies/136180/iron-man'}>Iron Man</Link> -{' '}
          {t('404.ExternalLink.Part2')}{' '}
          <Link href={'/collections/53/all-mcu-movies'}>MCU Movies</Link>
        </Typography>
      </div>
    </div>
  );
};

export default Error404Content;
