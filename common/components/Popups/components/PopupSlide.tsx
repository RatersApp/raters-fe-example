import type { ReactNode } from 'react';
import { memo, useState } from 'react';
import { Modal, Slide } from '@material-ui/core';
import { useWindowSizeListener } from '../../../helpers/hooks/useWindowSize';

export interface IPopupProps {
  isOpen: boolean;
  children: ReactNode;
  handleClose: () => void;
}

function PopupSlide({ isOpen, children, handleClose }: IPopupProps) {
  const [type, setType] = useState<'slide' | 'fade'>(
    window.innerWidth > 425 ? 'fade' : 'slide',
  );
  useWindowSizeListener((width) => {
    setType(width > 425 ? 'fade' : 'slide');
  });
  let style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
  };
  if (type == 'slide') {
    style = {
      ...style,
      justifyContent: 'stretch',
      alignItems: 'flex-end',
    };
  }
  return (
    <Modal
      className="modal"
      keepMounted
      open={isOpen}
      onClose={handleClose}
      disablePortal
    >
      <Slide
        in={isOpen}
        timeout={{
          enter: type == 'fade' ? 0 : 300,
          exit: 0,
        }}
        direction={'up'}
      >
        <div
          style={style}
          onClick={(e) => e.target == e.currentTarget && handleClose()}
        >
          {children}
        </div>
      </Slide>
    </Modal>
  );
}

export default memo(PopupSlide);
