import { createReducer } from '@reduxjs/toolkit';
import { setCurrentLanguage, setLanguageLoadingEnd } from './languageActions';

const initialState = {
  currentLang: 'en',
  languageLoading: false,
};

const languageReducer = createReducer(initialState, {
  [setCurrentLanguage]: (state, action) => ({
    ...state,
    currentLang: action.payload,
    languageLoading: true,
  }),
  [setLanguageLoadingEnd]: (state) => ({
    ...state,
    languageLoading: false,
  }),
});

export default languageReducer;
