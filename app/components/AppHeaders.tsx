import { useRouter } from 'next/router';
import GuestMobileAppBar from '../../common/components/GuesUser/GuestMobileAppBar';
import GuestPromoMobileAppBar from '../../common/components/GuesUser/GuestPromoMobileAppBar';
import MobileHeaderAppBar from '../../features/Container/components/MobileHeaderAppBar';
import HeaderAppBar from '../../features/Container/components/HeaderAppBar';
import GuestAppBar from '../../common/components/GuesUser/GuestAppBar';
import { useSyncStorage } from '../../common/helpers/syncStorage';

export const AppHeaders = () => {
  const isLoginInStore = !!useSyncStorage().userId;

  const router = useRouter();

  if (!router.route.includes('/login')) {
    if (isLoginInStore) {
      return (
        <>
          <div className="hide-on-sm-down">
            <HeaderAppBar />
          </div>
          <div className="show-on-sm-down">
            <MobileHeaderAppBar />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="hide-on-sm-down">
            <GuestAppBar />
          </div>
          <div className="show-on-sm-down">
            {router.pathname !== '/about-us' ? (
              <GuestMobileAppBar />
            ) : (
              <GuestPromoMobileAppBar />
            )}
          </div>
        </>
      );
    }
  } else {
    return null;
  }
};
