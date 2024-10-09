import React from 'react';
import { Modal, Box, Typography } from '@material-ui/core';
import CloseButtonIcon from '../../../common/assets/svg/closeButton.svg';
import { Web3ButtonModal } from './Web3ButtonModal';
import ICPIcon from '../../../common/assets/svg/icp-logo.svg';
import NFIDIcon from '../../../common/assets/png/nfid-logo.png';
import PhantomIcon from '../../../common/assets/svg/phantom-logo.svg';
// eslint-disable-next-line no-restricted-imports
import { useTranslation } from 'react-i18next';

export function Web3Modal({
  open,
  handleClose,
  handleNFIDAuth,
  handleICPAuth,
  handlePhantomWallet,
  isNFIDConnected = false,
  isIIDConnected = false,
  isPhantomConnected = false,
}: {
  open: boolean;
  isNFIDConnected: boolean;
  isIIDConnected: boolean;
  isPhantomConnected: boolean;
  handleClose: () => void;
  handleNFIDAuth: () => void;
  handleICPAuth: () => void;
  handlePhantomWallet: () => void;
}) {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={handleClose} className="modal">
      <Box className="authWeb3Modal">
        <Box className="authWeb3Modal-close_button">
          <button
            onClick={handleClose}
            type="button"
            className="handleCloseRatePopup"
          >
            <CloseButtonIcon />
          </button>
        </Box>
        <Typography variant={'h6'} className="authWelcomeMessage">
          {t('NewLogin.web3.title')}
        </Typography>
        <Box className="authWeb3Modal-buttons_container">
          <Web3ButtonModal
            disable={isIIDConnected}
            icon={ICPIcon}
            title={'Internet Identity'}
            handler={handleICPAuth}
          />
          <Web3ButtonModal
            disable={isNFIDConnected}
            icon={NFIDIcon}
            title={'NFID'}
            handler={handleNFIDAuth}
          />
          <Web3ButtonModal
            disable={isPhantomConnected}
            icon={PhantomIcon}
            title={'Phantom Wallet'}
            handler={handlePhantomWallet}
          />
        </Box>
      </Box>
    </Modal>
  );
}
