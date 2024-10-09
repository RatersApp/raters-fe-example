import React, { useState, useCallback, useEffect } from 'react';
import type { FC, PropsWithChildren } from 'react';

// ui
import {
  Modal,
  Box,
  Typography,
  Input,
  Select,
  MenuItem,
  Button,
  Tooltip,
} from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'next-i18next';
import styles from './cryptoLike.module.scss';
import classNames from 'classnames';
import { monserrat, openSans } from '../../../pages/_app';
import { LoadingButton } from '../Buttons/LoadingButton';
import { InputApp } from '../Input/InputApp';
import { useForm, Controller, useWatch } from 'react-hook-form';
// import { useFormErrors } from '../../../features/Auth/common/hooks';
import { InputError } from '../Input/InputError';
import { apiClient } from '../../api/apiClient';
import { authApiClient } from '../../api/authApiClient';
// import { useLastError } from '../../../common/helpers/hooks/useLastError';
import CloseButtonIcon from '../../../common/assets/svg/closeButton.svg';
import DownIcon from '../../../common/assets/svg/Down.svg';
import SolanaIcon from '../../../common/assets/svg/solana-icon.svg';
import UsdcIcon from '../../../common/assets/svg/usdc-icon.svg';
import { toast } from 'react-toastify';
import { useSyncStorage } from '../../helpers/syncStorage';
import PhantomIcon from '../../../common/assets/svg/phantom-logo.svg';
import { Web3ButtonModal } from '../../../features/Auth/components/Web3ButtonModal';
import { Skeleton } from '@material-ui/lab';
import { useInfiniteQuery } from '../../api/useInfiniteQuery';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
const PopupSlide = dynamic(() => import('./components/PopupSlide'), {
  ssr: false,
});

// d3
import { Connection, PublicKey } from '@solana/web3.js';
import createTransferTransactionV0, {
  SERVICE_FEE_ACCOUNT,
} from '../../../features/Auth/components/Phantom/createTransferTransactionV0';
import signAndSendTransaction from '../../../features/Auth/components/Phantom/signAndSendTransaction';
import pollSignatureStatus from '../../../features/Auth/components/Phantom/pollSignatureStatus';
import getProviderAndPublicKey from '../../../features/Auth/components/Phantom/getProviderAndPublicKey';
import calculateFeeService from '../../../features/Auth/components/Phantom/calcalateFeeService';
import createSignInMessage from '../../../features/Auth/components/Phantom/createSignInMessage';
import getBalance from '../../../features/Auth/components/Phantom/getBalance';
import { CONNECTION_NETWORK_URL } from '../../../features/Auth/components/Phantom/network';
import type { SolanaSignInInput } from '../../../features/Auth/components/Phantom/types';

type fieldPopup = {
  network: string;
  token: 'sol' | 'usdc';
  amount: number | string;
};

export const CryptoLikePopup: FC<
  PropsWithChildren<{
    handleClose: () => void;
    ToAddress: string;
    ratingId: number;
  }>
> = ({ handleClose, ToAddress, ratingId }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const isGuestUser = !useSyncStorage().userId;
  const userId = useSyncStorage().userId;
  const form = useForm<fieldPopup>({
    defaultValues: {
      network: 'Solana',
      token: 'sol',
      amount: 0.01,
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setError,
  } = form;
  const { data } = apiClient.endpoints.userProfile.useQuery({});
  const popupOpenWeb3User = !!data?.data?.solPublicKey;
  // console.log(isGuestUser, popupOpenWeb3User)
  const [saveCryptolike, saveCryptolikeResult] =
    apiClient.useSaveCryptolikeMutation();

  /** SignAndSendTransactionV0 */
  const handleSignAndSendTransactionV0 = useCallback(
    async ({ token, amount }: Partial<fieldPopup>) => {
      setLoading(true);
      try {
        const connection = new Connection(CONNECTION_NETWORK_URL, {
          commitment: 'confirmed',
        });

        const [phantomPublicKey, provider] = await getProviderAndPublicKey(
          true,
        );
        const ToAddressPublicKey = new PublicKey(ToAddress);
        const [payToReview, payToService] = calculateFeeService(amount);
        if (!provider || !phantomPublicKey || !token) return;
        const balance = await getBalance(phantomPublicKey, connection, token);
        if (Number(amount) > balance) {
          setError('amount', { type: 'manual', message: 'Insufficient Funds' });
          return;
        }
        if (Number(amount) <= 0) {
          setError('amount', {
            type: 'manual',
            message: 'Amount must be bigger than 0',
          });
          return;
        }
        const transactionV0 = await createTransferTransactionV0(
          phantomPublicKey,
          connection,
          token,
          payToReview,
          payToService,
          ToAddressPublicKey,
        );
        console.log({
          status: 'info',
          method: 'signAndSendTransactionV0',
          message: `Requesting signature for: ${JSON.stringify(
            transactionV0.message,
          )}`,
        });
        const signature = await signAndSendTransaction(provider, transactionV0);
        toast(t('Web.Thanks.Title'));
        console.log({
          status: 'info',
          method: 'signAndSendTransactionV0',
          message: `Signed and submitted transactionV0 ${signature}.`,
        });
        saveCryptolike({
          signature: signature,
          publicKey: phantomPublicKey.toBase58(),
          payToReview,
          payToService,
          transantion_msg: Buffer.from(transactionV0.message.serialize()),
          ratingId: ratingId,
          page: location.href,
          token: token,
          amount: Number(amount),
          devnet: location.search.includes('devnet'),
        });
        await pollSignatureStatus(signature, connection);
        setTimeout(() => {
          handleClose();
        }, 5000);
      } catch (error) {
        let errorMessage: any = 'Error:signAndSendTransactionV0';
        if (error instanceof Error) {
          errorMessage = error.message || error;
        }
        console.log({
          status: 'error',
          method: 'signAndSendTransactionV0',
          message: errorMessage,
        });
        setError('token', {
          type: 'manual',
          message: errorMessage || 'Error:signAndSendTransactionV0',
        });
      } finally {
        setLoading(false);
      }
    },
    [ToAddress, ratingId, setLoading],
  );

  //   useFormErrors(form, useLastError([sendResult.error, changeResult.error]));

  ///  Login ============================================================================
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);
  const [loginPhantom] = authApiClient.useLoginPhantomMutation();
  const [connectPhantom] = apiClient.useConnectPhantomMutation();

  const handlePhantomWallet = useCallback(async () => {
    setDisable(true);
    try {
      const [phantomPublicKey, phantomProvider] = await getProviderAndPublicKey(
        false,
      );
      const res = await dispatch(
        // @ts-ignore
        authApiClient.endpoints.singInPhantomMassage.initiate(
          {},
          { subscribe: true, forceRefetch: true },
        ),
      );

      if (!phantomProvider || !phantomPublicKey || !res.isSuccess) return;

      const signInData: SolanaSignInInput = res.data;

      const domain = signInData.domain || window.location.host;
      const address = signInData.address || phantomPublicKey.toBase58();

      let signature, message;

      if (
        phantomProvider &&
        'signIn' in phantomProvider &&
        typeof phantomProvider.signIn == 'function'
      ) {
        signature = await phantomProvider.signIn({
          ...signInData,
          domain,
          address,
        });

        message = String.fromCharCode(...signature.signedMessage);
        signature = {
          publicKey: phantomPublicKey.toBase58(),
          signature: signature.signature,
        };
      } else {
        const [msg, signedMessage] = createSignInMessage({
          ...signInData,
          domain,
          address,
        });

        signature = await phantomProvider.signMessage(signedMessage);
        signature.publicKey = phantomPublicKey.toBase58();

        message = msg;
      }
      let responseServer;

      if (isGuestUser) {
        responseServer = await loginPhantom({
          ...signature,
          message,
        });
      }

      if (!isGuestUser && !popupOpenWeb3User) {
        responseServer = await connectPhantom({
          ...signature,
          message,
          userId: userId,
        });
      }

      if (responseServer?.error?.data?.error) {
        toast(t(responseServer?.error?.data?.message));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDisable(false);
    }
  }, [dispatch, loginPhantom, connectPhantom, t, userId]);

  /// Login End =========================================================================================

  if (isGuestUser || !popupOpenWeb3User) {
    return (
      <div className={styles.popupWrapper}>
        <button className={styles.close} onClick={handleClose}>
          <CloseButtonIcon />
        </button>
        {isGuestUser && (
          <>
            {' '}
            <Typography variant={'h6'} className="authWelcomeMessage">
              {t('NewLogin.web3.title')}
            </Typography>
            <h5
              className={classNames([
                'welcomeMessageDescription',
                openSans.className,
              ])}
            >
              {t('NewLogin.Subtitle')}
            </h5>
            <Box className="authWeb3Modal-buttons_container">
              <Web3ButtonModal
                disable={disable}
                icon={PhantomIcon}
                title={'Phantom Wallet'}
                handler={handlePhantomWallet}
              />
            </Box>
          </>
        )}
        {!isGuestUser && !popupOpenWeb3User && (
          <>
            {' '}
            <Typography variant={'h6'} className="authWelcomeMessage">
              {t('Settings.web3.title')}
            </Typography>
            <Box className="authWeb3Modal-buttons_container">
              <Web3ButtonModal
                disable={disable}
                icon={PhantomIcon}
                title={'Phantom Wallet'}
                handler={handlePhantomWallet}
              />
            </Box>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={styles.popupWrapper}>
      <button className={styles.close} onClick={handleClose}>
        <CloseButtonIcon />
      </button>
      <h2 className={styles.title}> {t('Cryptolike.Title')}</h2>
      <form
        className={styles.reset}
        onSubmit={handleSubmit(handleSignAndSendTransactionV0)}
      >
        <Controller
          control={control}
          name={'network'}
          rules={{ required: true }}
          render={({ field }) => (
            <div>
              <InputLabel className={styles.label} htmlFor={field.name}>
                {t(`Cryptolike.Network`)}
              </InputLabel>
              <StyledSelect
                defaultValue={field.value}
                name={field.name}
                inputRef={field.ref}
                inputProps={field}
              >
                <StyledMenuItem value={'Solana'}>
                  <SolanaIcon className={styles.menuicon} />
                  Solana
                </StyledMenuItem>
              </StyledSelect>
            </div>
          )}
        />
        <Controller
          control={control}
          name={'token'}
          rules={{ required: true }}
          render={({ field }) => (
            <div>
              <InputLabel className={styles.label} htmlFor={field.name}>
                {t(`Cryptolike.Token`)}
              </InputLabel>
              <StyledSelect
                placeholder={t(`Cryptolike.TokenLabel`)}
                name={field.name}
                defaultValue={field.value}
                inputRef={field.ref}
                inputProps={field}
              >
                <StyledMenuItem value={'sol'}>
                  <SolanaIcon className={styles.menuicon} />
                  Solana [ sol ]
                </StyledMenuItem>
                <StyledMenuItem value={'usdc'}>
                  <UsdcIcon className={styles.menuicon} />
                  USD [ usdc ]
                </StyledMenuItem>
              </StyledSelect>
            </div>
          )}
        />
        <InputError error={errors['token']} />
        <div>
          <InputApp
            placeholder={t(`Cryptolike.Amount`)}
            label={t(`Cryptolike.AmountLabel`)}
            name={'amount'}
            control={control}
            rules={{ required: true }}
            handleError={false}
            type={'number'}
            inputProps={{ step: 'any' }}
          />
        </div>
        <InputError error={errors['amount']} />
        <div className={styles.buttons}>
          <Button
            disableFocusRipple
            className={classNames('mainButton', styles.calcelButton)}
            color="primary"
            variant="outlined"
            onClick={() => {
              if (loading) {
                setLoading(false);
              } else {
                handleClose();
                reset({ amount: '' });
              }
            }}
          >
            <p>{t('Cryptolike.Cancel')}</p>
          </Button>
          <LoadingButton
            isLoading={loading}
            text={t('Cryptolike.Send')}
            type={'submit'}
          />
        </div>
      </form>
    </div>
  );
};

const StyledMenuItem: typeof MenuItem = styled((props) => (
  <MenuItem {...props} />
))({
  fontSize: '14px',
  margin: '1px 5px',
  color: '#677897',
  borderRadius: '20px',
  height: '35px',
  padding: '11px 11px 11px 20px',
  border: '1px solid transparent',
  '&: hover': {
    background: '#EAF1FC',
  },
  '&.Mui-selected': {
    background: '#FFF',
    fontWeight: '600',
    '&: hover': {
      background: '#EAF1FC',
    },
  },
}) as unknown as typeof MenuItem;

const StyledSelect: typeof Select = styled((props) => (
  <Select {...props} IconComponent={DownIcon} variant="outlined" />
))({
  '.MuiSelect-outlined': {
    fontSize: '14px',
    marginLeft: '5px',
    color: '#47536A',
    fontWeight: '500',
    height: '40px',
    borderRadius: '20px',
    lineHeight: '2.9em',
    backgroundColor: '#eaf1fc !important',
    padding: '11px 11px 11px 20px',
    border: '1px solid transparent',
  },
  '.MuiOutlinedInput-input': {
    padding: '0',
    paddingLeft: '16px',
  },
  '.MuiSelect-icon ': {
    marginTop: '8px',
    marginRight: '8px',
  },

  '.MuiOutlinedInput-notchedOutline': {
    borderRadius: '0px 2px 2px 0px',
    border: 'none',
    display: 'none',
  },
}) as unknown as typeof Select;

export const CryptoLikesTablePopup: FC<
  PropsWithChildren<{ handleClose: () => void; ratingId: string }>
> = ({ handleClose, ratingId }) => {
  const { t } = useTranslation();
  // const MyCryptolikes = apiClient.useMyCryptolikesQuery({ratingId},{ refetchOnMountOrArgChange: true });

  const params = {
    ratingId,
    page: 1,
  } as const;

  const [MyCryptolikes, fetchNext, _, resetMyCryptolikes] = useInfiniteQuery(
    apiClient.endpoints.MyCryptolikes,
    { ...params },
  );

  const dataLength = MyCryptolikes.data?.data?.length || 0;
  return (
    <div className={styles.popupTableWrapper}>
      <button className={styles.close} onClick={handleClose}>
        <CloseButtonIcon />
      </button>
      <h2 className={styles.titleLeft}>
        {' '}
        {t('Cryptolikes.Title')}{' '}
        {!MyCryptolikes.isLoading && (
          <>({MyCryptolikes.data?.meta.total || 0})</>
        )}
      </h2>
      <div id={'scrollWrapper11'} className={styles.TableWrapper}>
        <InfiniteScroll
          next={fetchNext}
          dataLength={dataLength}
          hasMore={dataLength < MyCryptolikes?.data?.meta?.total || 0 || false}
          loader={<></>}
          scrollThreshold={0.9}
          className={styles.InfiniteScroll}
          scrollableTarget={'scrollWrapper11'}
        >
          <table className={styles.table}>
            <tr className={monserrat.className}>
              <th className={styles.supershortCol}>#</th>
              <th>{t('Cryptolikes.Date')}</th>
              <th>{t('Cryptolikes.Nickname')}</th>
              <th>{t('Cryptolikes.Sender')}</th>
              <th>{t('Cryptolikes.Recipient')}</th>
              <th className={styles.shortCol}>{t('Cryptolikes.Reward')}</th>
              <th className={styles.shortCol}>{t('Cryptolikes.Сurrency')}</th>
              <th>{t('Cryptolikes.Transaction')}</th>
            </tr>
            {MyCryptolikes.isLoading ? (
              <>
                <tr className={styles.skeleton}>
                  <td colSpan={8}>
                    <Skeleton />
                  </td>
                </tr>
                <tr className={styles.skeleton}>
                  <td colSpan={8}>
                    <Skeleton />
                  </td>
                </tr>
                <tr className={styles.skeleton}>
                  <td colSpan={8}>
                    <Skeleton />
                  </td>
                </tr>
              </>
            ) : (
              <>
                {MyCryptolikes.data?.data.map((like, i) => {
                  return (
                    <tr key={like.id} className={openSans.className}>
                      <td>{i + 1}</td>
                      <td>
                        {dayjs(like.createdAt * 1000).format(
                          'YYYY-MM-DD HH:mm:ss',
                        )}
                      </td>
                      <td>{like.nickname}</td>
                      <td>
                        <Tooltip title={like.fromWallet}>
                          <div>
                            <a
                              target="_blank"
                              href={`https://explorer.solana.com/address/${like.fromWallet}`}
                              rel="noreferrer"
                            >
                              {like.fromWallet}
                            </a>
                          </div>
                        </Tooltip>
                      </td>
                      <td>
                        <Tooltip title={like.toWallet}>
                          <div>
                            <a
                              target="_blank"
                              href={`https://explorer.solana.com/address/${like.toWallet}`}
                              rel="noreferrer"
                            >
                              {like.toWallet}
                            </a>
                          </div>
                        </Tooltip>
                      </td>
                      <td>{like.amount}</td>
                      <td>{like.token}</td>
                      <td>
                        <Tooltip title={like.transactionId}>
                          <div>
                            <a
                              target="_blank"
                              href={`https://explorer.solana.com/tx/${like.transactionId}`}
                              rel="noreferrer"
                            >
                              {like.transactionId}
                            </a>
                          </div>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}
                {MyCryptolikes.isFetching && (
                  <>
                    <tr className={styles.skeleton}>
                      <td colSpan={8}>
                        <Skeleton />
                      </td>
                    </tr>
                    <tr className={styles.skeleton}>
                      <td colSpan={8}>
                        <Skeleton />
                      </td>
                    </tr>
                    <tr className={styles.skeleton}>
                      <td colSpan={8}>
                        <Skeleton />
                      </td>
                    </tr>
                  </>
                )}
              </>
            )}
          </table>
        </InfiniteScroll>
      </div>
      <div className={styles.buttons}>
        <Button
          disableFocusRipple
          className={classNames('mainButton', styles.calcelButton)}
          color="primary"
          variant="outlined"
          onClick={() => {
            resetMyCryptolikes();
          }}
        >
          <p>{t('Refresh')}</p>
        </Button>
        <Button
          disableFocusRipple
          className={classNames('mainButton')}
          color="primary"
          variant="contained"
          onClick={handleClose}
        >
          <p>{t('Cryptolikes.Close')}</p>
        </Button>
      </div>
    </div>
  );
};

function roundUp(num: number, precision: number) {
  precision = Math.pow(10, precision);
  return Math.ceil(num * precision) / precision;
}

const MOUNTH_UPGRADE_PAYMENT = 1.99;
const YEAR_UPGRADE_PAYMENT = 11.99;

export const UpgradePopup: FC<
  PropsWithChildren<{
    isOpen: boolean;
    handleClose: () => void;
    period?: 'month' | 'year';
  }>
> = ({ isOpen, handleClose, period: period_ }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState(period_ || 'year');
  const isGuestUser = !useSyncStorage().userId;
  const userId = useSyncStorage().userId;

  useEffect(() => {
    if (period_) setPeriod(period_);
  }, [period_]);

  const form = useForm<fieldPopup>({
    defaultValues: {
      network: 'Solana',
      token: 'usdc',
      amount: period == 'year' ? YEAR_UPGRADE_PAYMENT : MOUNTH_UPGRADE_PAYMENT,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    setValue,
  } = form;

  const token = useWatch({ name: 'token', control });

  useEffect(() => {
    const exec = async () => {
      const amount: number =
        period == 'year' ? YEAR_UPGRADE_PAYMENT : MOUNTH_UPGRADE_PAYMENT;

      if (token == 'usdc') {
        setValue('amount', amount);
      }
      if (token == 'sol') {
        try {
          const res = await dispatch(
            // @ts-ignore
            apiClient.endpoints.solanaExchange.initiate(
              {},
              { subscribe: true, forceRefetch: true },
            ),
          );

          if (res.data.error) {
            toast(res.data.message);
            setValue('token', 'usdc');
          } else {
            // @ts-ignore
            setValue(
              'amount',
              roundUp(Number(amount) / res.data.result.sol, 5).toString(),
            );
          }
        } catch (e) {
          toast(e.toString());
          setValue('token', 'usdc');
        }
      }
    };

    exec();
  }, [period, token]);

  const { data } = apiClient.endpoints.userProfile.useQuery({});
  const popupOpenWeb3User = !!data?.data?.solPublicKey;
  // console.log(isGuestUser, popupOpenWeb3User)
  const [saveUpgrade] = apiClient.useUpgradeMutation();

  /** SignAndSendTransactionV0 */
  const handleSignAndSendTransactionV0 = useCallback(
    async ({ token, amount }: Partial<fieldPopup>) => {
      setLoading(true);
      try {
        const connection = new Connection(CONNECTION_NETWORK_URL, {
          commitment: 'confirmed',
        });

        amount = Number(amount);

        const [phantomPublicKey, provider] = await getProviderAndPublicKey(
          true,
        );
        if (!provider || !phantomPublicKey || !token || !amount) return;
        const balance = await getBalance(phantomPublicKey, connection, token);
        if (amount > balance) {
          setError('amount', { type: 'manual', message: 'Insufficient Funds' });
          return;
        }
        if (amount <= 0) {
          setError('amount', {
            type: 'manual',
            message: 'Amount must be bigger than 0',
          });
          return 1;
        }
        const transactionV0 = await createTransferTransactionV0(
          phantomPublicKey,
          connection,
          token,
          amount,
          0,
          SERVICE_FEE_ACCOUNT,
        );
        console.log({
          status: 'info',
          method: 'signAndSendTransactionV0',
          message: `Requesting signature for: ${JSON.stringify(
            transactionV0.message,
          )}`,
        });
        const signature = await signAndSendTransaction(provider, transactionV0);
        toast(t('Web.Thanks.Title'));
        console.log({
          status: 'info',
          method: 'signAndSendTransactionV0',
          message: `Signed and submitted transactionV0 ${signature}.`,
        });
        saveUpgrade({
          signature: signature,
          publicKey: phantomPublicKey.toBase58(),
          page: location.href,
          token: token,
          amount: amount,
          period: period,
          devnet: location.search.includes('devnet'),
        });
        await pollSignatureStatus(signature, connection);
        setTimeout(() => {
          handleClose();
        }, 5000);
        setTimeout(() => {
          dispatch(apiClient.util.invalidateTags(['user']));
        }, 25000);
      } catch (error) {
        let errorMessage: any = 'Error:signAndSendTransactionV0';
        if (error instanceof Error) {
          errorMessage = error.message || error;
        }
        console.log({
          status: 'error',
          method: 'signAndSendTransactionV0',
          message: errorMessage,
        });
        setError('token', {
          type: 'manual',
          message: errorMessage || 'Error:signAndSendTransactionV0',
        });
      } finally {
        setLoading(false);
      }
    },
    [setLoading, period],
  );

  //   useFormErrors(form, useLastError([sendResult.error, changeResult.error]));

  ///  Login ============================================================================
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);
  const [loginPhantom] = authApiClient.useLoginPhantomMutation();
  const [connectPhantom] = apiClient.useConnectPhantomMutation();

  const handlePhantomWallet = useCallback(async () => {
    setDisable(true);
    try {
      const [phantomPublicKey, phantomProvider] = await getProviderAndPublicKey(
        false,
      );
      const res = await dispatch(
        // @ts-ignore
        authApiClient.endpoints.singInPhantomMassage.initiate(
          {},
          { subscribe: true, forceRefetch: true },
        ),
      );

      if (!phantomProvider || !phantomPublicKey || !res.isSuccess) return;

      const signInData: SolanaSignInInput = res.data;

      const domain = signInData.domain || window.location.host;
      const address = signInData.address || phantomPublicKey.toBase58();

      let signature, message;

      if (
        phantomProvider &&
        'signIn' in phantomProvider &&
        typeof phantomProvider.signIn == 'function'
      ) {
        signature = await phantomProvider.signIn({
          ...signInData,
          domain,
          address,
        });

        message = String.fromCharCode(...signature.signedMessage);
        signature = {
          publicKey: phantomPublicKey.toBase58(),
          signature: signature.signature,
        };
      } else {
        const [msg, signedMessage] = createSignInMessage({
          ...signInData,
          domain,
          address,
        });

        signature = await phantomProvider.signMessage(signedMessage);
        signature.publicKey = phantomPublicKey.toBase58();

        message = msg;
      }
      let responseServer;

      if (isGuestUser) {
        responseServer = await loginPhantom({
          ...signature,
          message,
        });
      }

      if (!isGuestUser && !popupOpenWeb3User) {
        responseServer = await connectPhantom({
          ...signature,
          message,
          userId: userId,
        });
      }

      if (responseServer?.error?.data?.error) {
        toast(t(responseServer?.error?.data?.message));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDisable(false);
    }
  }, [dispatch, loginPhantom, connectPhantom, t, userId]);

  /// Login End =========================================================================================

  const closeWithReset = () => {
    handleClose();
  };

  if (isGuestUser || !popupOpenWeb3User) {
    return (
      <PopupSlide isOpen={isOpen} handleClose={closeWithReset}>
        <div className={styles.popupWrapper}>
          <button className={styles.close} onClick={closeWithReset}>
            <CloseButtonIcon />
          </button>
          {isGuestUser && (
            <>
              {' '}
              <Typography variant={'h6'} className="authWelcomeMessage">
                {t('NewLogin.web3.title')}
              </Typography>
              <h5
                className={classNames([
                  'welcomeMessageDescription',
                  openSans.className,
                ])}
              >
                {t('NewLogin.Subtitle')}
              </h5>
              <Box className="authWeb3Modal-buttons_container">
                <Web3ButtonModal
                  disable={disable}
                  icon={PhantomIcon}
                  title={'Phantom Wallet'}
                  handler={handlePhantomWallet}
                />
              </Box>
            </>
          )}
          {!isGuestUser && !popupOpenWeb3User && (
            <>
              {' '}
              <Typography variant={'h6'} className="authWelcomeMessage">
                {t('Settings.web3.title')}
              </Typography>
              <Box className="authWeb3Modal-buttons_container">
                <Web3ButtonModal
                  disable={disable}
                  icon={PhantomIcon}
                  title={'Phantom Wallet'}
                  handler={handlePhantomWallet}
                />
              </Box>
            </>
          )}
        </div>
      </PopupSlide>
    );
  }

  return (
    <PopupSlide isOpen={isOpen} handleClose={closeWithReset}>
      <div className={styles.popupWrapper}>
        <button className={styles.close} onClick={closeWithReset}>
          <CloseButtonIcon />
        </button>
        <h2 className={styles.title}> {t('BuyPlan.Page.Title')}</h2>
        {!period_ && (
          <div className="pro_users_header_switcher_wrapper">
            <div className="switch_wrapper">
              <Typography
                style={{
                  contain: 'content',
                  fontWeight: period == 'month' ? 600 : 400,
                }}
              >
                {t('BuyPlan.Page.Monthly')}
              </Typography>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  checked={period == 'year'}
                  onChange={(e) => {
                    setPeriod(e.target.checked ? 'year' : 'month');
                  }}
                  className="toggle-switch-checkbox"
                  name="toggleSwitch"
                  id="toggleSwitch"
                />
                <label className="toggle-switch-label" htmlFor="toggleSwitch">
                  <span
                    className="toggle-switch-inner"
                    style={{ transition: 'margin 0.1s linear 0s' }}
                  />
                  <span
                    className="toggle-switch-switch"
                    style={{ transition: 'all 0.1s linear 0s' }}
                  />
                </label>
              </div>
              <Typography
                style={{
                  contain: 'content',
                  fontWeight: period == 'year' ? 600 : 400,
                }}
              >
                {t('BuyPlan.Page.Annual')}
              </Typography>
            </div>
          </div>
        )}
        <form
          className={styles.reset}
          onSubmit={handleSubmit(handleSignAndSendTransactionV0)}
        >
          <Controller
            control={control}
            name={'network'}
            rules={{ required: true }}
            render={({ field }) => (
              <div>
                <InputLabel className={styles.label} htmlFor={field.name}>
                  {t(`Cryptolike.Network`)}
                </InputLabel>
                <StyledSelect
                  defaultValue={field.value}
                  name={field.name}
                  inputRef={field.ref}
                  inputProps={field}
                >
                  <StyledMenuItem value={'Solana'}>
                    <SolanaIcon className={styles.menuicon} />
                    Solana
                  </StyledMenuItem>
                </StyledSelect>
              </div>
            )}
          />
          <Controller
            control={control}
            name={'token'}
            rules={{ required: true }}
            render={({ field }) => (
              <div>
                <InputLabel className={styles.label} htmlFor={field.name}>
                  {t(`Cryptolike.Token`)}
                </InputLabel>
                <StyledSelect
                  placeholder={t(`Cryptolike.TokenLabel`)}
                  name={field.name}
                  defaultValue={field.value}
                  inputRef={field.ref}
                  inputProps={field}
                >
                  <StyledMenuItem value={'sol'}>
                    <SolanaIcon className={styles.menuicon} />
                    Solana [ sol ]
                  </StyledMenuItem>
                  <StyledMenuItem value={'usdc'}>
                    <UsdcIcon className={styles.menuicon} />
                    USD [ usdc ]
                  </StyledMenuItem>
                </StyledSelect>
              </div>
            )}
          />
          <InputError error={errors['token']} />
          <div>
            <InputApp
              placeholder={t(`Cryptolike.Amount`)}
              label={t(`Cryptolike.AmountLabel`)}
              name={'amount'}
              control={control}
              rules={{ required: true }}
              handleError={false}
              type={'number'}
              inputProps={{ step: 'any', readOnly: true }}
              disabled
            />
          </div>
          <InputError error={errors['amount']} />
          <div className={styles.buttons}>
            <Button
              disableFocusRipple
              className={classNames('mainButton', styles.calcelButton)}
              color="primary"
              variant="outlined"
              onClick={() => {
                if (loading) {
                  setLoading(false);
                } else {
                  closeWithReset();
                }
              }}
            >
              <p>{t('Cryptolike.Cancel')}</p>
            </Button>
            <LoadingButton
              isLoading={loading}
              text={t('Cryptolike.Send')}
              type={'submit'}
            />
          </div>
        </form>
      </div>
    </PopupSlide>
  );
};
