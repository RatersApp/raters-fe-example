import AvaStormTrooperLarge from '../../common/assets/png/AvaStormtrooperExtraLarge.png';
import IronManFallback from '../../common/assets/png/IronManFallback.png';
import SpiderManFallbackMedium from '../../common/assets/png/SpiderManFallbackMedium.png';
import IronManFallbackMD from '../../common/assets/png/AvatarIronManSmall.png';
import { GUEST_USER_ID } from '../config/strings';

const fallbackCollection = {
  lg: [AvaStormTrooperLarge, IronManFallback, SpiderManFallbackMedium],
  md: [AvaStormTrooperLarge, IronManFallbackMD, SpiderManFallbackMedium],
  square: [AvaStormTrooperLarge, IronManFallbackMD, SpiderManFallbackMedium],
};

const useRandomFallback = (
  id: number | null,
  size: keyof typeof fallbackCollection,
) => {
  const fallbackArr = fallbackCollection[size];
  return fallbackArr[(id || GUEST_USER_ID) % fallbackArr.length];
};

export default useRandomFallback;
