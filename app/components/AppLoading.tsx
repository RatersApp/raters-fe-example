import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SuspenseFallback from '../../common/components/Progress/SuspenseFallback';

export default function AppLoading() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
    const handleChange = (url: string, { shallow }: { shallow: boolean }) => {
      setLoading(url !== router.asPath && !shallow);
    };
    router.events.on('routeChangeStart', handleChange);

    return () => router.events.off('routeChangeStart', handleChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath, router.locale]);

  return loading ? <SuspenseFallback /> : null;
}
