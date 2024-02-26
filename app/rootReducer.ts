import type { AnyAction } from 'redux';
import { combineReducers } from 'redux';
import loadingReducer from '../common/appFlow/loading/ducks';
import languageReducer from '../common/appFlow/language/languageReducer';
import { HYDRATE } from 'next-redux-wrapper';
import { authApiClient } from '../common/api/authApiClient';
import { systemReducer } from '../features/Auth/duck/reducer';
import { apiClient } from '../common/api/apiClient';

const appReducer = combineReducers({
  [systemReducer.name]: systemReducer.reducer,
  [authApiClient.reducerPath]: authApiClient.reducer,
  [apiClient.reducerPath]: apiClient.reducer,
  loading: loadingReducer,
  language: languageReducer,
});

export const whitelist = [
  'system',
  'trending',
  'feedContent',
  'exploreSlice',
] as const;

export const rootReducer = (state: AppState | undefined, action: AnyAction) => {
  if (
    authApiClient.endpoints.logout.matchFulfilled(action) ||
    state === undefined
  ) {
    return appReducer(undefined, action);
  }
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
      ...Object.fromEntries(whitelist.map((k) => [k, state[k]])),
    };
  }
  return appReducer(state, action);
};

export type AppState = ReturnType<typeof appReducer>;
