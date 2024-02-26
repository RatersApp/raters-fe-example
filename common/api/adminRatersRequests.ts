import client from './client';
import {
  ADD_REMOVE_TO_WATCH_LIST,
  DELETE_COMMENT,
  GET_FACEBOOK_FRIENDS,
  GET_FEED,
  GET_FEED_DETAILS,
  GET_MOVIE,
  GET_NOTIFICATIONS,
  GET_RECOMMENDED_USERS,
  LIKE_UNLIKE_FEED,
  POST_COMMENT,
  SEARCH_USER,
  UPDATE_IS_READ,
} from './routes';
import { GUEST_USER_ID } from '../config/strings';

export const updateIsRead = (userId) => {
  return client
    .post(UPDATE_IS_READ, {
      user_id: userId || GUEST_USER_ID,
    })
    .then((response) => response.data);
};

export const fetchRecommendedUsers = (userId) =>
  client
    .post(GET_RECOMMENDED_USERS, {
      user_id: userId || GUEST_USER_ID,
    })
    .then((response) => response.data);

export const fetchFeedMovies = (userId, page, lang) =>
  client
    .post(GET_FEED, {
      user_id: userId || GUEST_USER_ID,
      limit: 25,
      lang,
      page,
    })
    .then((response) => response.data);

export const getNotification = (userId) => {
  return client
    .post(GET_NOTIFICATIONS, {
      user_id: userId || GUEST_USER_ID,
    })
    .then((response) => response.data);
};

export const addRemoveMovieToWatchList = ({ userId, movieId }) =>
  client
    .post(ADD_REMOVE_TO_WATCH_LIST, {
      user_id: userId || GUEST_USER_ID,
      movie_id: movieId,
    })
    .then((response) => response.data);

export const fetchMovieInfo = ({ userId, movieId, lang }) =>
  client
    .post(GET_MOVIE, {
      user_id: userId || GUEST_USER_ID,
      id: movieId,
      lang,
    })
    .then((response) => response.data);

export const fetchLikeUnlikeMovie = ({ userId, id, type }) =>
  client
    .post(LIKE_UNLIKE_FEED, {
      user_id: userId || GUEST_USER_ID,
      type,
      id,
    })
    .then((response) => response.data);

export const searchUser = (name, userId) =>
  client
    .post(SEARCH_USER, {
      name,
      user_id: userId || GUEST_USER_ID,
    })
    .then((response) => response.data);

export const fetchFacebookFriends = (userId) =>
  client
    .post(GET_FACEBOOK_FRIENDS, {
      user_id: userId,
    })
    .then((response) => response.data);

export const postComment = ({ type, id, userId, comment }) =>
  client.post(POST_COMMENT, {
    user_id: userId || GUEST_USER_ID,
    type,
    comment,
    id,
  });

export const deleteComment = ({ id, userId }) => {
  return client
    .delete(DELETE_COMMENT, {
      params: {
        user_id: userId,
        comment_id: id,
      },
    })
    .then((response) => response.data);
};

export const fetchFeedDetails = ({ userId, postId, type, lang }) =>
  client.post(GET_FEED_DETAILS, {
    user_id: userId,
    id: postId,
    type,
    lang,
  });
