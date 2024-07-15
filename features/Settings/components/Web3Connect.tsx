import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '../../../common/components/Buttons/LoadingButton';
import type { IMyProfile } from '../../../common/api/apiTypes';
import ICPIcon from '../../../common/assets/svg/icp-logo.svg';
import NFIDIcon from '../../../common/assets/png/nfid-logo.png';
import Link from 'next/link';

import type { StaticImageData } from 'next/image';
import { Web3Modal } from '../../Auth/components/Web3Modal';
import { apiClient } from '../../../common/api/apiClient';
import { NFID } from '@nfid/embed';
import type { IdleOptions, AuthClientStorage } from '@dfinity/auth-client';
import type { SignIdentity } from '@dfinity/agent';
import { useInternetIdentity } from 'ic-use-internet-identity';
import RatersLogo from '../../../features/Landing/static/assets/img/navbar/logo.svg';
import { AccountIdentifier } from '@dfinity/ledger-icp';

const algorithm = {
  name: 'ECDSA',
  hash: { name: 'SHA-256' },
};

type NFIDConfig = {
  origin?: string;
  application?: {
    name?: string;
    logo?: string;
  };
  identity?: SignIdentity;
  storage?: AuthClientStorage;
  keyType?: 'ECDSA' | 'Ed25519';
  idleOptions?: IdleOptions;
};

const DisconnectButton = ({
  onClick,
  disable = false,
}: {
  onClick: any;
  disable?: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <button
      disabled={disable}
      className="settingsWeb3-list_item_button_disconnect"
      onClick={onClick}
    >
      {t('Settings.web3.button.disonnect')}
    </button>
  );
};

const SettingItem = ({
  Icon,
  name,
  id,
  disconnect,
  link,
  disable,
  principal,
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | StaticImageData;
  name: string;
  id: string;
  link?: string;
  disconnect: any;
  disable?: boolean;
  principal?: string;
}) => {
  return (
    <div className="settingsWeb3-list_item">
      <div>
        <div className="settingsWeb3-list_item_header">
          {Icon ? (
            <>
              {typeof Icon === 'function' ? (
                <Icon />
              ) : (
                <Image src={Icon} alt={'title'} />
              )}
            </>
          ) : null}
          <Typography variant={'h6'} className="authWeb3Modal-title">
            {name}
          </Typography>
        </div>
        <div>
          {link ? (
            <Link
              href={`${link}${id}`}
              target="_blank"
              className="settingsWeb3-list_item_address"
            >
              {id}
            </Link>
          ) : (
            <Typography
              variant={'h6'}
              className="settingsWeb3-list_item_address"
            >
              {id}
            </Typography>
          )}
        </div>
        {!!principal && (
          <div>
            <Typography
              variant={'h6'}
              className="settingsWeb3-list_item_address"
            >
              {principal}
            </Typography>
          </div>
        )}
      </div>
      <DisconnectButton onClick={disconnect} disable={disable} />
    </div>
  );
};

export default function Web3Connect({ user }: { user: IMyProfile }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const [nfid, setNfid] = useState<null | any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [disable, setDisable] = useState(false);

  function arrayBufferToHex(buffer: ArrayBuffer) {
    const bytes = new Uint8Array(buffer);
    return Array.from(bytes)
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  const [connectNFIDHandler, loginNFIDResult] =
    apiClient.useConnectNFIDMutation();
  const [connectICPHandler, loginICPResult] = apiClient.useConnectICPMutation();

  const [disconnectICPHandler, loginICPResultDis] =
    apiClient.useDisconnectICPMutation();

  const [disconnectNFIDHandler, loginNFIDResultDis] =
    apiClient.useDisconnectNFIDMutation();

  const encoder = new TextEncoder();

  const { isLoggingIn, login, clear, identity, loginStatus } =
    useInternetIdentity();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setDisable(false);
    setOpen(false);
  };

  const handleNFIDAuth = async () => {
    setOpen(false);
    if (nfid) {
      await nfid.getDelegation({});
      if (nfid.isAuthenticated) {
        setIsAuthenticated(true);
      }
    }
  };

  const handleICPAuth = () => {
    login();
  };

  const handleDisconnectICP = () => {
    clear();
    disconnectICPHandler({
      userId: user.id,
      principal_id: null,
      principal_user_app_id: null,
    });
  };

  const handleDisconnectNFID = () => {
    nfid.logout();
    disconnectNFIDHandler({
      userId: user.id,
      principal_id: null,
      principal_user_app_id: null,
    });
  };

  useEffect(() => {
    if (isAuthenticated && nfid) {
      setDisable(true);
      const processIdentity = async () => {
        try {
          const identity = nfid.getIdentity();
          const principalClear = identity.getPrincipal();

          if (identity) {
            const delegationArr =
              identity._delegation.delegations[0].delegation.pubkey;
            const principal = AccountIdentifier.fromPrincipal({
              principal: identity.getPrincipal(),
            }).toHex();

            const publicKey = arrayBufferToHex(delegationArr);
            const { privateKey } = identity._inner._keyPair;
            const uint8Array = encoder.encode(principal);

            const signedPrincipal = await window.crypto.subtle.sign(
              algorithm,
              privateKey,
              uint8Array,
            );

            const signedPrincipalString = arrayBufferToHex(signedPrincipal);
            connectNFIDHandler({
              userId: user.id,
              principal_id: principal,
              principal_user_app_id: principalClear.toText(),
              signed_principal: signedPrincipalString,
              delegation_pubkey: publicKey,
            });
          }
        } catch (err) {
          setDisable(false);
          console.error('Error processing identity or signing:', err);
        }
      };

      processIdentity();
    }
  }, [isAuthenticated, nfid]);

  useEffect(() => {
    const processIdentity = async () => {
      if (identity) {
        try {
          setDisable(true);
          const principalClear = identity.getPrincipal();

          const principal = AccountIdentifier.fromPrincipal({
            principal: identity.getPrincipal(),
          }).toHex();

          const delegationArr = (identity as any)._delegation.delegations[0]
            .delegation.pubkey;
          const uint8Array = encoder.encode(principal);
          const delegation = arrayBufferToHex(delegationArr);
          const { privateKey } = (identity as any)._inner._keyPair;

          const signedPrincipal = await window.crypto.subtle.sign(
            algorithm,
            privateKey,
            uint8Array,
          );
          const signedPrincipalString = arrayBufferToHex(signedPrincipal);

          connectICPHandler({
            userId: user.id,
            principal_id: principal,
            principal_user_app_id: principalClear.toText(),
            signed_principal: signedPrincipalString,
            delegation_pubkey: delegation,
          });
        } catch (err) {
          setDisable(false);
          console.error('Error processing identity or signing:', err);
        }
      }
    };

    processIdentity();
  }, [identity]);

  useEffect(() => {
    async function initializeNFID() {
      try {
        const nfidInstance = await NFID.init({
          application: {
            name: 'Raters',
            logo: RatersLogo,
          },
        } as NFIDConfig);
        setNfid(nfidInstance);
      } catch (error) {
        console.error('Failed to initialize NFID:', error);
      }
    }
    initializeNFID();
  }, []);

  const hasAnyWeb2Id = user.fbId || user.googleId || user.appleId || user.email;

  const disableNFID = !hasAnyWeb2Id && !user.iiId && !user.solPublicKey;
  const disableICP = !hasAnyWeb2Id && !user.nfidId && !user.solPublicKey;

  return (
    <>
      <div className="settings-panel">
        <Web3Modal
          isNFIDConnected={!!user.nfidId}
          isIIDConnected={!!user.iiId}
          open={open}
          handleClose={handleClose}
          handleNFIDAuth={handleNFIDAuth}
          handleICPAuth={handleICPAuth}
        />
        <Typography className="settings-title">
          {user.nfidId && user.iiId && user.solPublicKey
            ? t('Settings.web3.title.connected')
            : t('Settings.web3.title')}
        </Typography>
        <div className="settingsWeb3-list">
          {!user.nfidId && !user.iiId && !user.solPublicKey && (
            <Typography variant={'h6'} className="settingsWeb3-empty-title">
              {t('Settings.web3.description')}
            </Typography>
          )}
          <div>
            {!!user.nfidId && (
              <SettingItem
                Icon={NFIDIcon}
                link={'https://dashboard.internetcomputer.org/account/'}
                name={'NFID'}
                id={user.nfidId}
                principal={user.nfidPrincipal}
                disable={disableNFID}
                disconnect={handleDisconnectNFID}
              />
            )}
          </div>
          <div>
            {!!user.iiId && (
              <SettingItem
                Icon={ICPIcon}
                link={'https://dashboard.internetcomputer.org/account/'}
                name={'Internet Identity'}
                id={user.iiId}
                principal={user.iidPrincipal}
                disable={disableICP}
                disconnect={handleDisconnectICP}
              />
            )}
          </div>
          {(!user.nfidId || !user.iiId) && (
            <LoadingButton
              style={{ alignSelf: 'flex-end', marginTop: '16px' }}
              isLoading={false}
              text={t('Settings.web3.button.connect')}
              onClick={handleOpen}
            />
          )}
        </div>
      </div>
    </>
  );
}
