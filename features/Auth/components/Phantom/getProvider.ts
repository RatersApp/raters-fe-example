import { type PhantomProvider } from './types';

/**
 * Retrieves the Phantom Provider from the window object
 * @returns {PhantomProvider | undefined} a Phantom provider if one exists in the window
 */
const getProvider = (): PhantomProvider | undefined => {
  if ('phantom' in window) {
    const anyWindow: any = window;
    const provider = anyWindow.phantom?.solana;

    if (provider?.isPhantom) {
      return provider;
    }
  }

  const link = encodeURIComponent(
    new URL(globalThis.location.pathname, 'https://ratersapp.com/').toString(),
  );
  const ref = encodeURIComponent('https://ratersapp.com/');
  window.open(`https://phantom.app/ul/browse/${link}?ref=${ref}`, '_blank');
};

export default getProvider;
