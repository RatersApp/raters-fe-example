import { createReducer } from '@reduxjs/toolkit';
import {
  setCollectionListLoadingEnd,
  setCollectionListLoadingStart,
  setCollectionMovieLoadingEnd,
  setCollectionMovieLoadingStart,
  setExploreContentLoadingEnd,
  setExploreContentLoadingStart,
  setLoadingEnd,
  setLoadingStart,
  setPopularActorsLoadingEnd,
  setPopularActorsLoadingStart,
  setSearchCrewLoadingEnd,
  setSearchCrewLoadingStart,
  setSearchMoviesLoadingEnd,
  setSearchMoviesLoadingStart,
  setSearchUsersLoadingEnd,
  setSearchUsersLoadingStart,
  setFeedDetailsLoadingStart,
  setFeedDetailsLoadingEnd,
  setCommentSendingStart,
  setCommentSendingEnd,
  setCountryCodeUpdateLoadingStart,
  setCountryCodeUpdateLoadingEnd,
  setLikesLoadingEnd,
  setLikesLoadingStart,
  showAppBarLinearProgress,
  hideAppBarLinearProgress,
  setActorFilmographyLoadingEnd,
  setActorFilmographyLoadingStart,
  setRecommendedMoviesLoadingStart,
  setRecommendedMoviesLoadingEnd,
} from './loadingActions';

const initialState = {
  appLoading: false,
  exploreContentLoading: false,
  collectionListLoading: false,
  collectionMovieLoading: false,
  popularActorsLoading: false,
  searchCrewLoading: false,
  searchUsersLoading: false,
  searchMoviesLoading: false,
  feedDetailsLoading: false,
  commentSending: false,
  countryCodeUpdating: false,
  likesListLoading: false,
  appBarLinearProgressVisible: false,
  actorFilmographyLoading: false,
  recommendedMoviesLoading: false,
};

const loadingReducer = createReducer(initialState, {
  [setRecommendedMoviesLoadingStart]: (state) => ({
    ...state,
    recommendedMoviesLoading: true,
  }),
  [setRecommendedMoviesLoadingEnd]: (state) => ({
    ...state,
    recommendedMoviesLoading: false,
  }),
  [setExploreContentLoadingStart]: (state) => ({
    ...state,
    exploreContentLoading: true,
  }),
  [setExploreContentLoadingEnd]: (state) => ({
    ...state,
    exploreContentLoading: false,
  }),
  [setLoadingStart]: (state) => ({
    ...state,
    appLoading: true,
  }),
  [setLoadingEnd]: (state) => ({
    ...state,
    appLoading: false,
  }),
  [setCollectionListLoadingStart]: (state) => ({
    ...state,
    collectionListLoading: true,
  }),
  [setCollectionListLoadingEnd]: (state) => ({
    ...state,
    collectionListLoading: false,
  }),
  [setCollectionMovieLoadingStart]: (state) => ({
    ...state,
    collectionMovieLoading: true,
  }),
  [setCollectionMovieLoadingEnd]: (state) => ({
    ...state,
    collectionMovieLoading: false,
  }),
  [setPopularActorsLoadingStart]: (state) => ({
    ...state,
    popularActorsLoading: true,
  }),
  [setPopularActorsLoadingEnd]: (state) => ({
    ...state,
    popularActorsLoading: false,
  }),
  [setSearchCrewLoadingStart]: (state) => ({
    ...state,
    searchCrewLoading: true,
  }),
  [setSearchCrewLoadingEnd]: (state) => ({
    ...state,
    searchCrewLoading: false,
  }),
  [setSearchMoviesLoadingStart]: (state) => ({
    ...state,
    searchMoviesLoading: true,
  }),
  [setSearchMoviesLoadingEnd]: (state) => ({
    ...state,
    searchMoviesLoading: false,
  }),
  [setSearchUsersLoadingStart]: (state) => ({
    ...state,
    searchUsersLoading: true,
  }),
  [setSearchUsersLoadingEnd]: (state) => ({
    ...state,
    searchUsersLoading: false,
  }),
  [setFeedDetailsLoadingStart]: (state) => ({
    ...state,
    feedDetailsLoading: true,
  }),
  [setFeedDetailsLoadingEnd]: (state) => ({
    ...state,
    feedDetailsLoading: false,
  }),
  [setCommentSendingStart]: (state) => ({
    ...state,
    commentSending: true,
  }),
  [setCommentSendingEnd]: (state) => ({
    ...state,
    commentSending: false,
  }),
  [setCountryCodeUpdateLoadingStart]: (state) => ({
    ...state,
    countryCodeUpdating: true,
  }),
  [setCountryCodeUpdateLoadingEnd]: (state) => ({
    ...state,
    countryCodeUpdating: false,
  }),
  [setLikesLoadingStart]: (state) => ({
    ...state,
    likesListLoading: true,
  }),
  [setLikesLoadingEnd]: (state) => ({
    ...state,
    likesListLoading: false,
  }),
  [showAppBarLinearProgress]: (state) => ({
    ...state,
    appBarLinearProgressVisible: true,
  }),
  [hideAppBarLinearProgress]: (state) => ({
    ...state,
    appBarLinearProgressVisible: false,
  }),
  [setActorFilmographyLoadingStart]: (state) => ({
    ...state,
    actorFilmographyLoading: true,
  }),
  [setActorFilmographyLoadingEnd]: (state) => ({
    ...state,
    actorFilmographyLoading: false,
  }),
});

export default loadingReducer;
