import { selectorFabric } from '../../../app/reduxHelpers';

export default selectorFabric({
  getCurrentLang: (state) => state.language.currentLang,
  isLanguageLoading: (state) => state.language.languageLoading,
});
