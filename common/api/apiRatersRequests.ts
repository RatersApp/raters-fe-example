import {
  COLLECTION_FILTERS,
  FEED_LIKES,
  FILMOGRAPHY,
  GENRES_ALL,
  GENRES_FOR_SHORT_LOST,
  GENRES_SHORT_LIST,
  GET_RECOMMENDED_MOVIES,
  GLOSSARY_CREWS,
  GLOSSARY_DISCUSIONS,
  GLOSSARY_MOVIES,
  GLOSSARY_PROUSERS,
  GLOSSARY_RATING,
  GLOSSARY_USERS,
  GLOSSARY_WATCH_ONLINE,
  GLOSSARY_WATCHLIST,
  MAIN_MOVIES,
  MAIN_SEO,
  MAIN_USERS,
  MOVIE_IGNORE,
  MOVIE_SHORT_LIST,
  MOVIES_FOR_SHORT_LOST,
  PEOPLE,
  PEOPLE_POPULARITY,
  POST_DELETE_DISCUSSION,
  POST_DELETE_RATING,
  SEARCH_MOVIE,
  SEARCH_MOVIE_BY_GENRE,
  SEARCH_PEOPLE,
  SEARCH_USERS_FOR_TAG,
  STATISTIC,
} from './routes';
import client from './client';
import { i18n } from 'next-i18next';

export const fetchPopularActors = ({ lang }) => {
  return client
    .get(PEOPLE_POPULARITY, {
      params: {
        lang,
      },
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const searchMovie = (query) => {
  return client
    .get(SEARCH_MOVIE, {
      params: {
        query,
        lang: i18n.language,
        limit: 52,
      },
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const searchUsersForTag = (query) => {
  return client
    .get(SEARCH_USERS_FOR_TAG, {
      params: {
        query,
        limit: 6,
      },
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const searchPeople = (query) => {
  return client
    .get(SEARCH_PEOPLE, {
      params: {
        query,
        lang: i18n.language,
      },
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const fetchCollectionList = ({
  lang,
  main_flag,
  filters,
  title_order,
  count_order,
  page = 1,
  query = '',
  limit = 20,
}) => {
  return client
    .get(MOVIE_SHORT_LIST, {
      params: {
        lang: lang === 'default' ? 'en' : lang,
        limit,
        main_flag,
        filters,
        title_order,
        count_order,
        page,
        query,
      },
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const fetchCollectionFilters = ({ lang }) => {
  return client
    .get(COLLECTION_FILTERS, {
      params: {
        lang,
      },
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const fetchCollectionMovies = ({
  userId,
  collectionId,
  limit,
  lang,
  page,
  minDuration,
  maxDuration,
  genres,
  maxYear,
  minYear,
  type,
}) => {
  return client
    .get(MOVIES_FOR_SHORT_LOST, {
      params: {
        with_description: 1,
        lang,
        user_id: userId,
        short_list_id: collectionId,
        limit,
        page,
        min_duration: minDuration,
        max_duration: maxDuration === 210 ? null : maxDuration,
        max_year: maxYear,
        min_year: minYear,
        genre_id: genres,
        type,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((e) => console.error(e));
};

export const fetchGenresList = ({ lang }) => {
  return client
    .get(GENRES_SHORT_LIST, {
      params: {
        lang,
        web_flag: 1,
      },
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const fetchGenresMovies = ({
  userId,
  collectionId,
  limit,
  lang,
  page,
}) => {
  return client
    .get(GENRES_FOR_SHORT_LOST, {
      params: {
        with_description: 1,
        lang,
        user_id: userId,
        short_list_id: collectionId,
        limit,
        page,
        web_flag: 1,
      },
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const postRating = ({
  movieId,
  rating,
  description,
  userId,
  spoilers,
}) => {
  return client
    .post(POST_DELETE_RATING, null, {
      params: {
        movie_id: movieId,
        rating,
        user_id: userId,
        description,
        spoilers,
      },
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const postDiscussion = ({ movieId, description, userId, spoilers }) => {
  return client
    .post(POST_DELETE_DISCUSSION, null, {
      params: {
        movie_id: movieId,
        user_id: userId,
        description,
        spoilers,
      },
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const deleteRating = ({
  movieId,
  userId,
}: {
  movieId: number;
  userId: number;
}) => {
  return client
    .delete(POST_DELETE_RATING, {
      params: {
        movie_id: movieId,
        user_id: userId,
      },
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const fetchRecommendedMovies = ({ userId, page, limit, lang }) => {
  return client
    .get(GET_RECOMMENDED_MOVIES, {
      params: {
        user_id: userId,
        limit,
        page,
        lang,
      },
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const fetchAllGenres = ({ lang }) => {
  return client
    .get(GENRES_ALL, {
      params: {
        lang,
      },
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const fetchMoviesByGenre = ({
  genres,
  userId,
  tagUserIds,
  minDuration,
  maxDuration,
  minYear,
  maxYear,
  currentPage,
  lang,
  type,
}) => {
  return client
    .get(SEARCH_MOVIE_BY_GENRE, {
      params: {
        with_description: 1,
        limit: 50,
        user_id: userId,
        min_duration: minDuration,
        max_duration: maxDuration === 210 ? null : maxDuration,
        max_year: maxYear,
        min_year: minYear,
        tag_user_id: tagUserIds,
        genre_id: genres,
        page: currentPage || 1,
        lang,
        type,
      },
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const fetchActorProfile = ({ id, lang }) => {
  return client
    .get(`${PEOPLE}/${id}`, {
      params: {
        lang,
      },
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

// TODO: add infinite scroll
export const fetchActorFilmography = (actorId) => {
  return client
    .get(`${FILMOGRAPHY}/${actorId}`, {
      params: {
        limit: 100,
      },
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const fetchPostLikes = ({ userId, feedId, limit, type }) => {
  return client
    .get(FEED_LIKES, {
      params: {
        user_id: userId,
        feed_id: feedId,
        limit: limit || null,
        type: type || null,
      },
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const ignoreMovie = ({ userId, movieId }) => {
  return client
    .post(
      MOVIE_IGNORE,
      {},
      {
        params: {
          user_id: userId,
          movie_id: movieId,
        },
      },
    )
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const fetchGlossaryMovies = ({ page, limit, lang }) => {
  return client
    .get(GLOSSARY_MOVIES, {
      params: {
        limit,
        page,
        lang,
      },
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const fetchGlossaryCrews = ({ page, limit, lang }) => {
  return client
    .get(GLOSSARY_CREWS, {
      params: {
        limit,
        page,
        lang,
      },
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const fetchGlossaryRating = ({ page, limit, lang }) => {
  return client
    .get(GLOSSARY_RATING, {
      params: {
        limit,
        page,
        lang,
      },
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const fetchGlossaryUsers = ({ page, limit, lang }) => {
  return client
    .get(GLOSSARY_USERS, {
      params: {
        limit,
        page,
        lang,
      },
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const fetchGlossaryProUsers = ({ page, limit, lang }) => {
  return client
    .get(GLOSSARY_PROUSERS, {
      params: {
        limit,
        page,
        lang,
      },
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const fetchGlossaryWatchOnline = ({ page, limit, lang }) => {
  return client
    .get(GLOSSARY_WATCH_ONLINE, {
      params: {
        limit,
        page,
        lang,
      },
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const fetchGlossaryWatchlists = ({ page, limit, lang }) => {
  return client
    .get(GLOSSARY_WATCHLIST, {
      params: {
        limit,
        page,
        lang,
      },
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const fetchGlossaryDiscusions = ({ page, limit, lang }) => {
  return client
    .get(GLOSSARY_DISCUSIONS, {
      params: {
        limit,
        page,
        lang,
      },
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const fetchMainMovies = ({ lang, userId }) => {
  return client
    .get(MAIN_MOVIES, {
      params: {
        lang,
        user_id: userId,
      },
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const fetchMainUsers = ({ userId }) => {
  return client
    .post(MAIN_USERS, {
      user_id: userId,
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const fetchMainSeo = ({ lang }) => {
  return client
    .get(MAIN_SEO, {
      params: {
        lang,
      },
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

export const fetchStatistic = ({ userId, lang }) => {
  return client
    .get(STATISTIC, {
      params: {
        user_id: userId,
        lang,
      },
    })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};
