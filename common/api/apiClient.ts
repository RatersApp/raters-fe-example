import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseEndpointConfig } from './baseEndpointConfig';
import { ADMIN_APP_ROUTE, APP_ROUTE } from './routes';
import { GUEST_USER_ID } from '../config/strings';
import type {
  IChangePasswordParams,
  IFollower,
  IFollowersParams,
  IMovieParams,
  IMovieReviewsParams,
  IMyProfile,
  IPaged,
  IResponse,
  IUpdateCountryParams,
  IUpdateProfileParams,
  IUserPageParams,
  IUserProfile,
} from './apiTypes';
import { infiniteDefinition } from './infiniteDefinition';
import { syncStorage } from '../helpers/syncStorage';
import type { CollectionType, MovieType } from '../helpers/types';

export const apiClient = createApi({
  ...baseEndpointConfig(),
  reducerPath: 'api' as const,
  tagTypes: ['user'] as const,
  endpoints: (builder) => ({
    genres: builder.query<null, { lang: string }>({
      query: ({ lang }) => ({
        url: `${APP_ROUTE}/genre/all`,
        params: { lang },
      }),
    }),
    genresAll: builder.query<null, { lang: string }>({
      query: ({ lang }) => ({
        url: `${APP_ROUTE}/genres-short-list`,
        params: { lang },
      }),
    }),
    passwordChange: builder.mutation<null, IChangePasswordParams>({
      query: (body) => ({
        url: `${APP_ROUTE}/password/change`,
        method: 'POST',
        body,
      }),
    }),
    allReviews: builder.query<IPaged<unknown>, IUserPageParams>(
      infiniteDefinition({
        query: ({ userId = GUEST_USER_ID, ...other }) => ({
          url: `${APP_ROUTE}/own-posts`,
          params: { userId, ...other },
        }),
      }),
    ),
    movieReviews: builder.query<IPaged<unknown>, IMovieReviewsParams>(
      infiniteDefinition({
        query: ({ userId = GUEST_USER_ID, ...other }) => ({
          url: `${APP_ROUTE}/movie/reviews`,
          params: { userId, ...other },
          limit: 20,
        }),
      }),
    ),
    discussions: builder.query<IPaged<unknown>, IUserPageParams>(
      infiniteDefinition({
        query: ({ userId = GUEST_USER_ID, ...other }) => ({
          url: `${APP_ROUTE}/own-discussion`,
          params: { userId, ...other },
        }),
      }),
    ),
    friendsAddedMovie: builder.query<IPaged<unknown>, IMovieParams>(
      infiniteDefinition({
        query: ({ userId = GUEST_USER_ID, ...other }) => ({
          url: `${APP_ROUTE}/friends-add-movie`,
          params: { userId, ...other },
        }),
      }),
    ),
    movieDiscussions: builder.query<IPaged<unknown>, IMovieParams>(
      infiniteDefinition({
        query: (params) => ({
          url: `${APP_ROUTE}/movie/discussions`,
          params,
        }),
      }),
    ),
    studios: builder.query<IPaged<unknown>, { lang: string; page: number }>(
      infiniteDefinition({
        query: ({ ...other }) => ({
          url: `${APP_ROUTE}'/studios`,
          params: { ...other },
          limit: 20,
        }),
      }),
    ),
    studioMovies: builder.query<
      IPaged<unknown>,
      { lang: string; page: number; path: string; userId: number | string }
    >(
      infiniteDefinition({
        query: ({ userId = GUEST_USER_ID, path, ...other }) => ({
          url: `${APP_ROUTE}/studios/${path}`,
          params: { userId, ...other },
          limit: 20,
          responseHandler: async (response) => {
            const text = await response.text();
            return text.length ? JSON.parse(text) : null;
          },
        }),
      }),
    ),
    exploreContent: builder.query<
      IPaged<MovieType>,
      {
        lang: string;
        page: number;
        userId: number | string | null;
        tagUserId?: string;
      }
    >(
      infiniteDefinition({
        query: ({ userId = GUEST_USER_ID, ...other }) => ({
          url: `${APP_ROUTE}/search/movie-by-genre`,
          params: { userId, ...other },
          limit: 20,
        }),
      }),
    ),
    sendOtp: builder.mutation<null, { email?: string; customToken?: string }>({
      query: ({ customToken, ...body }) => ({
        url: `${APP_ROUTE}/api/send-otp`,
        method: 'POST',
        body,
        headers: customToken ? { Authorization: `Bearer ${customToken}` } : {},
      }),
    }),
    checkEmail: builder.mutation<null, { email: string }>({
      query: (body) => ({
        url: `${APP_ROUTE}/api/check-email`,
        method: 'POST',
        body,
      }),
    }),
    verifyOtp: builder.mutation<null, { email?: string; code: string }>({
      query: (body) => ({
        url: `${APP_ROUTE}/api/verify-otp`,
        method: 'POST',
        body,
      }),
      invalidatesTags: () => [
        { type: 'user', id: syncStorage.userId || undefined },
      ],
    }),
    changeEmail: builder.mutation<
      null,
      { email: string; code: string; customToken?: string }
    >({
      query: ({ customToken, ...body }) => ({
        url: `${APP_ROUTE}/api/verify-otp-change-email`,
        method: 'POST',
        body,
        headers: customToken ? { Authorization: `Bearer ${customToken}` } : {},
      }),
      invalidatesTags: () => [
        { type: 'user', id: syncStorage.userId || undefined },
      ],
    }),
    fullReviews: builder.query<IPaged<unknown>, IUserPageParams>(
      infiniteDefinition({
        query: ({ userId = GUEST_USER_ID, ...other }) => ({
          url: `${ADMIN_APP_ROUTE}/api/getFullOwnReviews`,
          body: { userId, ...other },
          method: 'POST',
        }),
      }),
    ),
    userRatings: builder.query<IPaged<unknown>, IUserPageParams>(
      infiniteDefinition({
        query: ({ userId = GUEST_USER_ID, ...other }) => ({
          url: `${ADMIN_APP_ROUTE}/api/getUserRatings`,
          body: { userId, ...other, limit: 20 },
          method: 'POST',
        }),
      }),
    ),
    toWatch: builder.query<IPaged<unknown>, IUserPageParams>(
      infiniteDefinition({
        query: ({ userId = GUEST_USER_ID, ...other }) => ({
          url: `${ADMIN_APP_ROUTE}/api/getUserWatchList`,
          body: { userId, ...other, limit: 20 },
          method: 'POST',
        }),
      }),
    ),
    followers: builder.query<IPaged<IFollower>, IFollowersParams>(
      infiniteDefinition({
        query: ({ userId = GUEST_USER_ID, ...other }) => ({
          url: `${ADMIN_APP_ROUTE}/api/getUserFollowers`,
          body: { userId, ...other, limit: 50 },
          method: 'POST',
        }),
      }),
    ),
    followings: builder.query<IPaged<IFollower>, IFollowersParams>(
      infiniteDefinition({
        query: ({ userId = GUEST_USER_ID, ...other }) => ({
          url: `${ADMIN_APP_ROUTE}/api/getUserFollowings`,
          body: { userId, ...other, limit: 50 },
          method: 'POST',
        }),
      }),
    ),
    myProfile: builder.query<IResponse<IMyProfile>, void>({
      query: () => ({
        url: `${APP_ROUTE}/api/getMyProfile`,
        method: 'POST',
      }),
      providesTags: (res) => [{ type: 'user', id: res?.data.id }],
    }),
    userProfile: builder.query<IResponse<IUserProfile>, { userId?: number }>({
      query: ({ userId }) => ({
        url: `${APP_ROUTE}/api/getUserProfile`,
        method: 'POST',
        body: { userId: userId || syncStorage.userId },
      }),
      providesTags: (res) => [{ type: 'user', id: res?.data.id }],
    }),
    updateProfile: builder.mutation<null, Partial<IUpdateProfileParams>>({
      query: (body) => ({
        url: `${ADMIN_APP_ROUTE}/api/updateUser`,
        method: 'POST',
        body,
      }),
      invalidatesTags: () => [
        { type: 'user', id: syncStorage.userId || undefined },
      ],
    }),
    updateCountry: builder.mutation<null, IUpdateCountryParams>({
      query: ({ userId, countryCode }) => ({
        url: `${APP_ROUTE}/user/country?user_id=${userId}`,
        method: 'POST',
        body: { countryCode },
      }),
    }),
    followUser: builder.mutation<null, { userId: number }>({
      query: ({ userId }) => ({
        url: `${ADMIN_APP_ROUTE}/api/follow`,
        method: 'POST',
        body: {
          userId: syncStorage.userId || GUEST_USER_ID,
          authorId: userId,
        },
      }),
    }),
    unFollowUser: builder.mutation<null, { userId: number }>({
      query: ({ userId }) => ({
        url: `${ADMIN_APP_ROUTE}/api/unfollow`,
        method: 'POST',
        body: {
          userId: syncStorage.userId || GUEST_USER_ID,
          authorId: userId,
        },
      }),
    }),
    movieInfo: builder.query<
      IResponse<unknown>,
      { userId: number | undefined; id: number; lang: string }
    >({
      query: ({ userId = GUEST_USER_ID, ...other }) => ({
        url: `${ADMIN_APP_ROUTE}/api/getMovie`,
        body: { userId, ...other },
        method: 'POST',
      }),
    }),
    genreMovies: builder.query<
      IPaged<MovieType>,
      {
        lang: string;
        page: number;
        shortListId: number | string;
      }
    >(
      infiniteDefinition({
        query: ({ ...other }) => ({
          url: `${APP_ROUTE}/genres-for-short-list`,
          params: { userId: syncStorage.userId, ...other },
          limit: 20,
        }),
      }),
    ),
    collectionMovies: builder.query<
      IPaged<MovieType>,
      {
        lang: string;
        page: number;
        shortListId: number | string;
      }
    >(
      infiniteDefinition({
        query: ({ ...other }) => ({
          url: `${APP_ROUTE}/movies-for-short-list`,
          params: { userId: syncStorage.userId, ...other },
          limit: 20,
        }),
      }),
    ),
    collections: builder.query<
      IPaged<CollectionType>,
      {
        lang: string;
        page: number;
        limit?: number;
        query?: string;
      }
    >(
      infiniteDefinition({
        query: ({ limit = 20, ...other }) => ({
          url: `${APP_ROUTE}/movie-short-list`,
          params: { limit, ...other },
        }),
      }),
    ),
    mainMovies: builder.query<
      IPaged<MovieType>,
      { userId: number | undefined; lang: string }
    >({
      query: ({ userId = GUEST_USER_ID, ...other }) => ({
        url: `${APP_ROUTE}/latest-releases`,
        params: { userId, ...other },
        method: 'GET',
      }),
    }),
  }),
});
