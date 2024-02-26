import styles from '../queryPopups.module.scss';
import { PopupWrapper } from './PopupWrapper';
import { Typography } from '@material-ui/core';
import { MainButton } from '../../Buttons/MainButton';
import type { FC } from 'react';
import { useBackPopup } from '../hooks/useOpenPopup';

interface IProps {
  title: string;
  description: string;
  Icon: FC;
  buttonText: string;
}

export default function AuthPopup({
  title,
  description,
  Icon,
  buttonText,
}: IProps) {
  const back = useBackPopup();

  return (
    <PopupWrapper className={styles.authPopup}>
      <Typography className={styles.title}>{title}</Typography>
      <Typography className={styles.description}>{description}</Typography>
      <Icon />
      <MainButton className={styles.button} text={buttonText} onClick={back} />
    </PopupWrapper>
  );
}
