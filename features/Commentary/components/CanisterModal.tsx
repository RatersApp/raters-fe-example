import { Modal, Box, Typography } from '@material-ui/core';
import CloseButtonIcon from '../../../common/assets/svg/closeButton.svg';
import LinkIcon from '../../../common/assets/svg/linkIcon.svg';
import CopyIcon from '../../../common/assets/svg/CopyIcon.svg';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const canisterLink = 'https://dashboard.internetcomputer.org/canister/';

function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
}

export default function CanisterModal({
  isShowModal,
  handleClose,
  canisters,
  createdAt,
}: {
  isShowModal: boolean;
  handleClose: () => void;
  createdAt: number;
  canisters: {
    network: string;
    canister: string;
    canisterPrincipal: string;
  };
}) {
  const { t } = useTranslation();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(canisters.canisterPrincipal).catch((err) => {
      console.error('Copy error ', err);
    });
  };

  return (
    <Modal open={isShowModal} onClose={handleClose} className="modal">
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
        <Typography variant={'h6'} className="canisterModalTitle">
          {t('canister.modal.title')}
        </Typography>
        <Box style={{ marginTop: '16px' }}>
          <ul className="canisterModalList">
            <li>
              <Typography variant={'h6'}>{t('canister.modal.id')}</Typography>
              <button
                className="canisterPrincipalContainer"
                onClick={copyToClipboard}
              >
                <div>
                  <CopyIcon />
                </div>
                <p>
                  {canisters.canisterPrincipal ||
                    (canisters as any).canister_principal}
                </p>
              </button>
            </li>
            <li>
              <Typography variant={'h6'}>
                {t('canister.modal.canister')}
              </Typography>
              <Link
                href={`${canisterLink}${canisters.canister}`}
                target="_blank"
              >
                <LinkIcon />
                <p>{canisters.canister}</p>
              </Link>
            </li>
            <li>
              <Typography variant={'h6'}>{t('canister.modal.date')}</Typography>
              <p>{formatTimestamp(createdAt)}</p>
            </li>
            <li>
              <Typography variant={'h6'}>
                {t('canister.modal.network')}
              </Typography>
              <p>{canisters.network}</p>
            </li>
          </ul>
        </Box>
      </Box>
    </Modal>
  );
}
