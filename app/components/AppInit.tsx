import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const AppInit = () => {
  const router = useRouter();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return null;
};
