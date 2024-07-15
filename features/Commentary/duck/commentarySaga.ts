import { put, call, select, takeEvery } from 'redux-saga/effects';

// duck
import {
  setCommentDeleteEnd,
  setCommentDeleteStart,
  setCommentSendingEnd,
  setCommentSendingStart,
  setFeedDetailsLoadingEnd,
  setFeedDetailsLoadingStart,
} from '../../../common/appFlow/loading/loadingActions';
import {
  deleteComment,
  fetchFeedDetails,
  postComment,
} from '../../../common/api/adminRatersRequests';
import {
  deleteCommentStart,
  deleteCommentSuccess,
  fetchFeedDetailsStart,
  fetchFeedDetailsSuccess,
  sendCommentStart,
  sendCommentSuccess,
} from './commentaryActions';
import { GUEST_USER_ID } from '../../../common/config/strings';
import { syncStorage } from '../../../common/helpers/syncStorage';

function* feedFeedDetailsWorker(action) {
  try {
    yield put(setFeedDetailsLoadingStart());

    const {
      data: { data: feedDetails },
    } = yield call(fetchFeedDetails, { ...action.payload });
    yield put(fetchFeedDetailsSuccess(feedDetails));
  } catch (e) {
  } finally {
    yield put(setFeedDetailsLoadingEnd());
  }
}

function* commentWorker(action) {
  try {
    const userId = syncStorage.userId;
    yield put(setCommentSendingStart());
    const {
      data: { data: commentObj },
    } = yield call(postComment, {
      ...action.payload,
      userId: userId || GUEST_USER_ID,
    });
    yield put(sendCommentSuccess(commentObj));
  } catch (e) {
  } finally {
    yield put(setCommentSendingEnd());
  }
}

function* deleteCommentWorker(action) {
  try {
    const userId = syncStorage.userId;
    yield put(setCommentDeleteStart());
    yield call(deleteComment, {
      ...action.payload,
      userId: userId || GUEST_USER_ID,
    });

    yield put(deleteCommentSuccess(action.payload));
  } catch (e) {
  } finally {
    yield put(setCommentDeleteEnd());
  }
}

export default function* commentarySaga() {
  yield takeEvery(fetchFeedDetailsStart.toString(), feedFeedDetailsWorker);
  yield takeEvery(sendCommentStart.toString(), commentWorker);
  yield takeEvery(deleteCommentStart.toString(), deleteCommentWorker);
}
