import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector, useStore } from 'react-redux';
import type { AppState } from './rootReducer';
import type { AppStore } from './store';

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppStore = () => useStore() as AppStore;
export const useAppDispatch = (): AppStore['dispatch'] => useDispatch();
export type AppSelectors = {
  [key: string]: (state: AppState) => unknown;
};
export const selectorFabric = <T extends AppSelectors>(selectors: T) =>
  selectors;
