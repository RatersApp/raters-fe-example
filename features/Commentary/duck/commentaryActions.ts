import { createAction } from '@reduxjs/toolkit';

export const fetchFeedDetailsStart = createAction(
  'commentary/FETCH_FEED_DETAILS_START',
  (params) => ({ payload: params }),
);

export const fetchFeedDetailsSuccess = createAction(
  'commentary/FETCH_FEED_DETAILS_SUCCESS',
  (data) => ({ payload: data }),
);

export const sendCommentStart = createAction(
  'commentary/SEND_COMMENT_START',
  (comment) => ({ payload: comment }),
);

export const sendCommentSuccess = createAction(
  'commentary/SEND_COMMENT_SUCCESS',
  (comment) => ({ payload: comment }),
);

export const deleteCommentStart = createAction(
  'commentary/DELETE_COMMENT_START',
  ({ id }) => ({ payload: { id } }),
);

export const deleteCommentSuccess = createAction(
  'commentary/DELETE_COMMENT_SUCCESS',
  (comment) => ({ payload: comment }),
);
