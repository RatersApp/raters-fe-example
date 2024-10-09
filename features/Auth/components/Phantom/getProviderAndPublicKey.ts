import type { PhantomProvider } from './types';
import type { PublicKey } from '@solana/web3.js';
import getProvider from './getProvider';

const getProviderAndPublicKey: (
  onlyIfTrusted?: boolean,
) => Promise<[PublicKey | null, PhantomProvider | undefined]> = async (
  onlyIfTrusted = false,
) => {
  const provider: PhantomProvider | undefined = getProvider();

  if (!provider) return [null, undefined];

  provider.connect({ onlyIfTrusted: onlyIfTrusted }).catch((err) => {
    console.log(err);
    provider.connect().catch((err) => {
      console.log(err);
    });
  });
  const publicKey: PublicKey | null = await new Promise((r) => {
    provider.on('connect', (publicKey: PublicKey) => {
      r(publicKey);
    });
  });

  return [publicKey, provider] as [
    PublicKey | null,
    PhantomProvider | undefined,
  ];
};

export default getProviderAndPublicKey;
