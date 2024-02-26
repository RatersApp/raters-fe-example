export const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export const OMDB_API_KEY = 'fe023d59';

export const ADMIN_APP_ROUTE = process.env.NEXT_PUBLIC_ADMIN_API;
export const APP_ROUTE = process.env.NEXT_PUBLIC_API;
export const OMDB_API = 'https://www.omdbapi.com';

// api.raters.com
// POST
export const GET_RECOMMENDED_MOVIES = `${APP_ROUTE}/trending-movies`;
export const POST_DELETE_RATING = `${APP_ROUTE}/rating`;
export const POST_DELETE_DISCUSSION = `${APP_ROUTE}/discussion`;
export const MOVIE_IGNORE = `${APP_ROUTE}/movie-ignore`;

// GET
export const MOVIES_FOR_SHORT_LOST = `${APP_ROUTE}/movies-for-short-list`;
export const MOVIE_SHORT_LIST = `${APP_ROUTE}/movie-short-list`;
export const COLLECTION_FILTERS = `${APP_ROUTE}/movie-short-list/filters`;
export const GENRES_FOR_SHORT_LOST = `${APP_ROUTE}/genres-for-short-list`;
export const GENRES_SHORT_LIST = `${APP_ROUTE}/genres-short-list`;
export const SEARCH_USERS_FOR_TAG = `${APP_ROUTE}/user-suggest`;

export const TRANSLATE = `${APP_ROUTE}/translate/{{lng}}/index.json`;
export const PEOPLE = `${APP_ROUTE}/people`;
export const GENRES_ALL = `${APP_ROUTE}/genre/all`;
export const SEARCH_MOVIE_BY_GENRE = `${APP_ROUTE}/search/movie-by-genre`;
export const PEOPLE_POPULARITY = `${PEOPLE}/popularity`;
export const SEARCH_MOVIE = `${APP_ROUTE}/search/movie`;
export const SEARCH_PEOPLE = `${APP_ROUTE}/search/people`;
export const FEED_LIKES = `${APP_ROUTE}/feed/likes`;
export const FILMOGRAPHY = `${APP_ROUTE}/filmography`;
export const GLOSSARY_MOVIES = `${APP_ROUTE}/glossary/movies`;
export const GLOSSARY_CREWS = `${APP_ROUTE}/glossary/crews`;
export const GLOSSARY_USERS = `${APP_ROUTE}/glossary/users`;
export const GLOSSARY_PROUSERS = `${APP_ROUTE}/glossary/prousers`;
export const GLOSSARY_RATING = `${APP_ROUTE}/glossary/rating`;
export const GLOSSARY_WATCHLIST = `${APP_ROUTE}/glossary/watchlist`;
export const GLOSSARY_DISCUSIONS = `${APP_ROUTE}/glossary/discussions`;
export const GLOSSARY_WATCH_ONLINE = `${APP_ROUTE}/glossary/watch_online`;

export const MAIN_MOVIES = `${APP_ROUTE}/latest-releases`;
export const STATISTIC = `${APP_ROUTE}/statistic`;

// POST
export const MAIN_USERS = `${ADMIN_APP_ROUTE}/api/getActiveUsers`;
export const MAIN_SEO = `${ADMIN_APP_ROUTE}/api/main_seo`;
export const GET_RECOMMENDED_USERS = `${ADMIN_APP_ROUTE}/api/getRecommendedUsers`;
export const GET_FEED = `${ADMIN_APP_ROUTE}/api/getFeed`;
export const LIKE_UNLIKE_FEED = `${ADMIN_APP_ROUTE}/api/likeUnlikeFeed`;
export const GET_FACEBOOK_FRIENDS = `${ADMIN_APP_ROUTE}/api/getUserFbFriends`;
export const GET_MOVIE = `${ADMIN_APP_ROUTE}/api/getMovie`;
export const ADD_REMOVE_TO_WATCH_LIST = `${ADMIN_APP_ROUTE}/api/addRemoveToWatchList`;
export const SEARCH_USER = `${ADMIN_APP_ROUTE}/api/searchUser`;
export const GET_FEED_DETAILS = `${ADMIN_APP_ROUTE}/api/getFeedDetails`;
export const POST_COMMENT = `${ADMIN_APP_ROUTE}/api/comment`;
export const DELETE_COMMENT = `${APP_ROUTE}/comment`;
export const GET_NOTIFICATIONS = `${ADMIN_APP_ROUTE}/api/getNotifications`;
export const UPDATE_IS_READ = `${ADMIN_APP_ROUTE}/api/updateIsRead`;
