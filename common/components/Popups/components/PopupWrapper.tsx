import styles from '../queryPopups.module.scss';
import type { FC, PropsWithChildren } from 'react';
import CloseButtonIcon from '../../../assets/svg/closeButton.svg';
import cls from 'classnames';
import { useBackPopup } from '../hooks/useOpenPopup';

export const PopupWrapper: FC<PropsWithChildren<{ className?: string }>> = ({
  className,
  children,
}) => {
  const back = useBackPopup();

  return (
    <div className={cls(styles.popupWrapper, className)}>
      <button className={styles.close} onClick={back}>
        <CloseButtonIcon />
      </button>
      {children}
    </div>
  );
};
