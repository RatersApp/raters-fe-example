/* eslint-disable @typescript-eslint/no-var-requires */
import createSagaMiddleware, { END } from 'redux-saga';
import type { Store } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { rootReducer, whitelist } from './rootReducer';
import type { Persistor } from 'redux-persist';
import type { StoreEnhancer } from 'redux';
import { authApiClient } from '../common/api/authApiClient';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { apiClient } from '../common/api/apiClient';

type StoreExt = {
  sagaTask: { toPromise: () => Promise<unknown> };
};

const NastyEnhancer: StoreEnhancer<StoreExt> =
  (createStore) => (reducer, initialState) => ({
    ...createStore(reducer, initialState),
    sagaTask: { toPromise: () => Promise.resolve() },
  });

export const makeStore = () => {
  const isClient = typeof window !== 'undefined';
  const sagaMiddleware = createSagaMiddleware();
  let reducer = rootReducer;
  let persistStore: (store: Store) => Persistor | undefined = () => undefined;

  if (isClient) {
    const persist = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    const persistConfig = {
      key: 'root',
      storage,
      whitelist,
    };

    reducer = persist.persistReducer(persistConfig, rootReducer);
    persistStore = persist.persistStore;
  }

  const store = configureStore({
    reducer,
    middleware: (gDM) =>
      gDM({ immutableCheck: false }).concat(
        sagaMiddleware,
        authApiClient.middleware,
        apiClient.middleware,
      ),
    enhancers: [NastyEnhancer],
  });

  setupListeners(store.dispatch);
  persistStore(store);

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;

export const awaitReduxQueries = async (store: AppStore) => {
  store.dispatch(END);
  await Promise.all([
    store.sagaTask.toPromise(),
    ...store.dispatch(authApiClient.util.getRunningQueriesThunk()),
    ...store.dispatch(apiClient.util.getRunningQueriesThunk()),
  ]);
};

export const wrapper = createWrapper(makeStore);
