import { createAction } from '@reduxjs/toolkit';

export const setCurrentLanguage = createAction(
  'language/SET_CURRENT_LANGUAGE',
  (data) => ({ payload: data }),
);

export const setLanguageLoadingEnd = createAction(
  'language/LANGUAGE_LOADING_END',
);
