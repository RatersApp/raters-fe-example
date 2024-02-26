import { useTranslation } from 'next-i18next';
import { useCallback } from 'react';
import type { TFuncKey } from 'i18next';

export const useTranslationLock = (lng: string) => {
  const { t, ...other } = useTranslation();
  const customT = useCallback(
    (key: TFuncKey) => {
      return t(key, { lng });
    },
    [t, lng],
  );

  return {
    ...other,
    t: customT,
  };
};
