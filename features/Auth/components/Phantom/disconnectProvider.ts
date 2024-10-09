/**
 * Retrieves the Phantom Provider from the window object and disconnect it.
 */
const disconnectProvider = () => {
  if ('phantom' in window) {
    const anyWindow: any = window;
    const provider = anyWindow.phantom?.solana;

    if (provider?.isPhantom) {
      provider.disconnect();
    }
  }
};

export default disconnectProvider;
