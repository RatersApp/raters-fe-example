import type { ImageProps } from 'next/image';
import Image from 'next/image';
import { Link, Typography } from '@material-ui/core';
import type { FC } from 'react';
import { Trans } from 'next-i18next';
import { useTranslationLock } from '../../../common/helpers/hooks/useTranslationLock';

interface IProps {
  avatar: ImageProps['src'];
  Country: FC;
  tKeyPrefix:
    | 'Rasim'
    | 'Oleg'
    | 'Tural'
    | 'Jamil'
    | 'Yurii'
    | 'Yevhenii'
    | 'Finn';
  links?: readonly string[];
}

export const TeamCard = ({ avatar, Country, tKeyPrefix, links }: IProps) => {
  const { t, i18n } = useTranslationLock('default');

  return (
    <div>
      <div>
        <Image src={avatar} alt={'rasim'} />
        <Country />
        <div>
          <Typography>{t(`fundraiser.team.${tKeyPrefix}.name`)}</Typography>
          <Typography>{t(`fundraiser.team.${tKeyPrefix}.position`)}</Typography>
          <Typography>
            {t(`fundraiser.team.${tKeyPrefix}.functionality`)}
          </Typography>
        </div>
      </div>
      <Typography>
        <Trans i18n={i18n}>
          {t(`fundraiser.team.${tKeyPrefix}.description`)}
          {links?.[0] && <Link href={links[0]} target="_blank" />}
          {links?.[1] && <Link href={links[1]} target="_blank" />}
        </Trans>
      </Typography>
      <div />
      <Typography>{t(`fundraiser.team.${tKeyPrefix}.experience`)}</Typography>
    </div>
  );
};
