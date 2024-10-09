import { useEffect, useState } from 'react';
import type { PhantomProvider } from './types';
import type { PublicKey } from '@solana/web3.js';
import getProvider from './getProvider';

const useProviderAndPublicKey: (
  enable: number,
) => [PublicKey | null, PhantomProvider | undefined] = (enable) => {
  const [phantomPublicKey, setPhantomPublicKey] = useState<PublicKey | null>(
    null,
  );
  const [provider, setProvider] = useState<PhantomProvider | undefined>(
    undefined,
  );

  useEffect(() => {
    if (enable == 0) return;

    if (!provider) {
      setProvider(getProvider());
      return;
    }
    // attempt to eagerly connect
    provider.connect({ onlyIfTrusted: true }).catch(() => {
      setPhantomPublicKey(null);
      // fail silently
    });

    provider.on('connect', (publicKey: PublicKey) => {
      setPhantomPublicKey(publicKey);
    });

    provider.on('disconnect', () => {
      setPhantomPublicKey(null);
    });

    provider.on('accountChanged', (publicKey: PublicKey | null) => {
      if (publicKey) {
        setPhantomPublicKey(publicKey);
      } else {
        /**
         * In this case dApps could...
         *
         * 1. Not do anything
         * 2. Only re-connect to the new account if it is trusted
         *
         * ```
         * provider.connect({ onlyIfTrusted: true }).catch((err) => {
         *  // fail silently
         * });
         * ```
         *
         * 3. Always attempt to reconnect
         */
        setPhantomPublicKey(null);

        provider.connect().catch((error) => {
          setPhantomPublicKey(null);
        });
      }
    });

    return () => {
      provider.disconnect();
    };
  }, [provider, enable]);
  return [phantomPublicKey, provider] as [
    PublicKey | null,
    PhantomProvider | undefined,
  ];
};

export default useProviderAndPublicKey;
