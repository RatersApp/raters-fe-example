export type MovieType = {
  id: string;
  title: string;
  releaseDate: number;
  poster: string;
  backdrop: string;
  tmdbPopularity: number;
  avgRating: number;
  followersRatingAmount: number;
  avgRatingUsers: number;
  ratingAmount: number;
  tmdbId: number;
  imdbId: number;
  type: string;
  runtime: number;
  status: string;
  movieUrl: string;
  genre: Array<GenreType>;
  followingsWhoRated: Array<FollowingsType>;
  whoRated: Array<FollowingsType>;
  overallRatings: number;
  overallActions: number;
  mediaBackdrop: null;
  listLikeUsers: null;
  description: string;
  inMyWatchList: boolean;
  ratedByMe: boolean;
  rating: number | string;
  refUrl: string;
};

export type GenreType = {
  id: number;
  name: string;
  checked?: boolean;
  seoText?: string;
};

export type FollowingsType = {
  id: number;
  image: string;
  created_at: string;
};

export type CollectionType = {
  id: number | string;
  title: string;
  poster: string;
  hex: string;
  icon: string;
  count: number;
  collectionUrl: string;
  seoText: string;
  preview: string;
  updateTime: string | null;
  new: number;
};

export type StudioType = {
  name: string;
  logoPath: string;
  url: string;
};

export type StudioInfoType = {
  name: string;
  logo_path: string;
  headquarters: string;
  origin_country: string;
  homepage: string;
};
