import { selectorFabric } from '../../../app/reduxHelpers';

export default selectorFabric({
  isLoading: (state) => state.loading.appLoading,
  isExploreContentLoading: (state) => state.loading.exploreContentLoading,
  isCollectionListLoading: (state) => state.loading.collectionListLoading,
  isCollectionMovieLoading: (state) => state.loading.collectionMovieLoading,
  isCrewLoading: (state) => state.loading.searchCrewLoading,
  isMoviesLoading: (state) => state.loading.searchMoviesLoading,
  isUsersLoading: (state) => state.loading.searchUsersLoading,
  isFeedDetailsLoading: (state) => state.loading.feedDetailsLoading,
  isCommentSending: (state) => state.loading.commentSending,
  isCountryCodeUpdating: (state) => state.loading.countryCodeUpdating,
  isLikesListLoading: (state) => state.loading.likesListLoading,
  isAppBarLinearProgressVisible: (state) =>
    state.loading.appBarLinearProgressVisible,
  isActorFilmographyLoading: (state) => state.loading.actorFilmographyLoading,
  isRecommendedMoviesLoading: (state) => state.loading.recommendedMoviesLoading,
});
