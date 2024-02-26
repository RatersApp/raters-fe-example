import { useRouter } from 'next/router';
import { useCallback } from 'react';

export type PopupId =
  | 'toWatch'
  | 'congratulations'
  | 'congratulationsVerify'
  | 'logout'
  | 'resetPassword'
  | 'passwordOtp'
  | 'verifyOtp'
  | 'changeOtp';

export const useOpenPopup = (popupId: PopupId, replace?: boolean) => {
  const router = useRouter();

  return useCallback(() => {
    const { popup } = router.query;
    let newPopup;
    if (popup) {
      if (popup == popupId || popup.includes(popupId)) {
        return;
      }
      newPopup = typeof popup === 'string' ? [popup] : popup;
      newPopup.push(popupId);
    } else {
      newPopup = popupId;
    }
    router.query.popup = newPopup;
    if (replace) {
      router.replace(router, undefined, { shallow: true });
    } else {
      router.push(router, undefined, { shallow: true });
    }
  }, [popupId, replace, router]);
};

export const useBackPopup = () => {
  const router = useRouter();

  return useCallback(() => {
    const { popup } = router.query;
    if (typeof popup === 'string') {
      delete router.query.popup;
    } else {
      popup?.pop();
    }
    router.push(router, undefined, { shallow: true });
  }, [router]);
};
