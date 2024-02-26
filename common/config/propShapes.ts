import { bool, instanceOf, number, oneOfType, string } from 'prop-types';

const movieInfoDefaultShape = {
  id: number,
  tmdb_id: oneOfType([number, string]),
  type: string,
  imdb_id: oneOfType([number, string]),
  title: string,
  description: string,
  runtime: number,
  release_date: instanceOf(Date),
  poster: string,
  backdrop: string,
  tmdb_popularity: number,
  status: string,
};

const recommendedMovieShape = {
  ...movieInfoDefaultShape,
  followers_rating_amount: number,
  total_normal_rating: string,
  avg_rating: number,
  in_my_watch_list: bool,
  rated_by_me: bool,
};

const actorMovieShape = {
  ...movieInfoDefaultShape,
  movie_id: number,
  person_id: number,
  job: string,
};

const userShape = {
  id: number,
  fb_id: string,
  email: string,
  username: string,
  first_name: string,
  last_name: string,
  password: number,
  is_admin: number,
  image: string,
  status: string,
  device_id: string,
  remember_token: number,
  created_at: string,
  updated_at: string,
  deleted_at: number,
  device_token: string,
  old: number,
  count_rating: number,
  average_rating: string,
  country_code: string,
  google_id: string,
  referral: string,
  followers: number,
  ratings: number,
  ratings_with_comments: number,
  ratings_with_review: number,
  score: string,
  correlation: number,
  is_following: bool,
};

const collectionListItemShape = {
  id: number,
  title: string,
  poster: string,
  hex: string,
  icon: string,
  count: number,
};

const genreShape = {
  id: number,
  name: string,
  isChecked: bool,
};

export default {
  recommendedMovieShape,
  actorMovieShape,
  movieInfoDefaultShape,
  genreShape,
  collectionListItemShape,
  userShape,
};
