import { createAction } from '@reduxjs/toolkit';

export const setExploreContentLoadingStart = createAction(
  'loading/EXPLORE_CONTENT_LOADING_START',
);

export const setExploreContentLoadingEnd = createAction(
  'loading/EXPLORE_CONTENT_LOADING_END',
);

export const setCollectionMovieLoadingStart = createAction(
  'loading/COLLECTION_MOVIE_LOADING_START',
);

export const setCollectionMovieLoadingEnd = createAction(
  'loading/COLLECTION_MOVIE_LOADING_END',
);

export const setLoadingStart = createAction('loading/APP_LOADING_START');

export const setCountryCodeUpdateLoadingStart = createAction(
  'loading/COUNTRY_CODE_UPDATE_START',
);

export const setActorFilmographyLoadingStart = createAction(
  'loading/ACTOR_FILMOGRAPHY_LOADING_START',
);

export const setActorFilmographyLoadingEnd = createAction(
  'loading/ACTOR_FILMOGRAPHY_LOADING_END',
);

export const setCountryCodeUpdateLoadingEnd = createAction(
  'loading/COUNTRY_CODE_UPDATE_END',
);

export const setLoadingEnd = createAction('loading/APP_LOADING_END');

export const setCollectionListLoadingStart = createAction(
  'loading/COLLECTION_LIST_LOADING_START',
);

export const setCollectionListLoadingEnd = createAction(
  'loading/COLLECTION_LIST_LOADING_END',
);

export const setPopularActorsLoadingStart = createAction(
  'loading/POPULAR_ACTORS_LOADING_START',
);

export const setPopularActorsLoadingEnd = createAction(
  'loading/POPULAR_ACTORS_LOADING_END',
);

export const setSearchCrewLoadingStart = createAction(
  'loading/SEARCH_CREW_LOADING_START',
);

export const setSearchCrewLoadingEnd = createAction(
  'loading/SEARCH_CREW_LOADING_END',
);

export const setSearchMoviesLoadingStart = createAction(
  'loading/SEARCH_MOVIES_LOADING_START',
);

export const setSearchMoviesLoadingEnd = createAction(
  'loading/SEARCH_MOVIES_LOADING_END',
);

export const setSearchUsersLoadingStart = createAction(
  'loading/SEARCH_USERS_LOADING_START',
);

export const setSearchUsersLoadingEnd = createAction(
  'loading/SEARCH_USERS_LOADING_END',
);

export const setFeedDetailsLoadingStart = createAction(
  'loading/FEED_DETAILS_LOADING_START',
);

export const setFeedDetailsLoadingEnd = createAction(
  'loading/FEED_DETAILS_LOADING_END',
);

export const setCommentSendingStart = createAction(
  'loading/COMMENT_SENDING_START',
);

export const setCommentSendingEnd = createAction('loading/COMMENT_SENDING_END');

export const setCommentDeleteStart = createAction(
  'loading/COMMENT_DELETE_START',
);

export const setCommentDeleteEnd = createAction('loading/COMMENT_DELETE_END');

export const setLikesLoadingStart = createAction(
  'loading/LIKES_LIST_LOADING_START',
);

export const setLikesLoadingEnd = createAction(
  'loading/LIKES_LIST_LOADING_END',
);

export const showAppBarLinearProgress = createAction(
  'loading/SHOW_APP_BAR_LINEAR_PROGRESS',
);

export const hideAppBarLinearProgress = createAction(
  'loading/HIDE_APP_BAR_LINEAR_PROGRESS',
);

export const setRecommendedMoviesLoadingStart = createAction(
  'loading/RECOMMENDED_MOVIES_LOADING_START',
);

export const setRecommendedMoviesLoadingEnd = createAction(
  'loading/RECOMMENDED_MOVIES_LOADING_END',
);
