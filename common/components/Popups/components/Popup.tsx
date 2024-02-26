import type { ReactNode } from 'react';
import { memo } from 'react';
import { Fade, Modal } from '@material-ui/core';

export interface IPopupProps {
  isOpen: boolean;
  children: ReactNode;
  handleClose: () => void;
}

function Popup({ isOpen, children, handleClose }: IPopupProps) {
  return (
    <Fade
      in={isOpen}
      timeout={{
        enter: 600,
        exit: 0,
      }}
    >
      <Modal
        className="modal"
        keepMounted
        open={isOpen}
        onClose={handleClose}
        disablePortal
      >
        <>{children}</>
      </Modal>
    </Fade>
  );
}

export default memo(Popup);
