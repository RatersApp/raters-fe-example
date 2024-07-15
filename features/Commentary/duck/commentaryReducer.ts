import { createReducer } from '@reduxjs/toolkit';
import {
  deleteCommentSuccess,
  fetchFeedDetailsSuccess,
  fetchUsersForTagSuccess,
  sendCommentSuccess,
} from './commentaryActions';

const initialState = {
  details: {},
};

const commentaryReducer = createReducer(initialState, {
  [fetchFeedDetailsSuccess]: (state, action) => ({
    ...state,
    details: action.payload,
  }),
  [sendCommentSuccess]: (state, action) => ({
    details: {
      ...state.details,
      comments: [action.payload, ...state.details.comments],
    },
  }),
  [deleteCommentSuccess]: (state, action) => ({
    details: {
      ...state.details,
      comments: [
        ...state.details.comments.filter(
          (item) => action.payload.id !== item.id,
        ),
      ],
    },
  }),
});

export default commentaryReducer;
