import { createSlice } from '@reduxjs/toolkit';
import { authApiClient } from '../../../common/api/authApiClient';
import { syncStorage } from '../../../common/helpers/syncStorage';

interface ISystemState {
  toWatchPopupOpened: boolean;
}

const initialState: ISystemState = {
  toWatchPopupOpened: false,
};

const authReducerFunction = (
  state: ISystemState,
  action: { payload: { otp: true } | { token: string } },
) => {
  if ('token' in action.payload) {
    setCookies(action.payload.token);
  }
};

export const systemReducer = createSlice({
  name: 'system',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApiClient.endpoints.login.matchFulfilled,
      authReducerFunction,
    );
    builder.addMatcher(
      authApiClient.endpoints.refreshToken.matchFulfilled,
      authReducerFunction,
    );
    builder.addMatcher(
      authApiClient.endpoints.registerConfirm.matchFulfilled,
      authReducerFunction,
    );
    builder.addMatcher(authApiClient.endpoints.logout.matchFulfilled, () => {
      setCookies();
    });
  },
});

export const systemActions = systemReducer.actions;

const setCookies = (token?: string) => {
  syncStorage.token = token;
  syncStorage.tempToken = undefined;
};
