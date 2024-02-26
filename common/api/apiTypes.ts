import type { CollectionType } from '../helpers/types';

export interface IAuthResult {
  token: string;
  isRegister: boolean;
  expiresAt: string;
  result: boolean;
  error: boolean;
  message: string;
  data: {
    user: {
      image: string;
      googleId: null;
      fbId: null;
      id: number;
      appleId: null;
      email: string;
      createdAt: string;
      emailVerified: boolean;
      isNeedVerifyEmail: boolean;
      username: string;
    };
  };
}

export interface ILoginParams {
  email: string;
  password: string;
}

export interface IRegisterParams {
  username: string;
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface IResetPasswordOtpParams {
  email: string;
  code: string;
}

export interface IResetPasswordParams extends IResetPasswordOtpParams {
  password: string;
  passwordConfirmation: string;
}

export interface IChangePasswordParams {
  oldPassword: string;
  password: string;
  passwordConfirmation: string;
}

export interface IResponse<T> {
  error: boolean;
  message: string;
  result: boolean;
  data: T;
}

export interface IPaged<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    next: string | null;
    prev: string | null;
  };
  meta: {
    currentPage: number;
    from: number;
    lastPage: number;
    path: string;
    perPage: number;
    to: number;
    total: number;
    relevants?: CollectionType[];
  };
}

export interface IUserParams {
  authorId: number;
  userId: number | undefined;
}

export interface IUserPageParams extends IUserParams {
  lang: string;
  page: number;
}

export type IUserProfile = {
  androidDevice: null;
  appRating: null;
  bio: null;
  correlation: number;
  correlationExists: boolean;
  countRating: number;
  createdAt: string;
  deletedAt: string | null;
  discussionCount: number;
  emailTwoStep: number;
  emailVerified: boolean;
  emailVerifiedAt: string | null;
  fbId: string | null;
  firstName: string | null;
  followersCount: number;
  followingsCount: number;
  googleTwoStep: number;
  id: number;
  image: string | null;
  iosDevice: null;
  isAdmin: boolean;
  isBlocked: boolean;
  isFollowing: boolean;
  isTranslationActive: boolean;
  language: string;
  lastName: string | null;
  level: number;
  old: number;
  onboarding: number;
  personalUrl: null;
  popupShowed: boolean;
  popupShowedDate: null;
  postsCount: number;
  proFake: number;
  ratingsCount: number;
  ratingsWithDescriptionCount: number;
  refUrl: string;
  referral: string;
  score: number;
  updatedAt: string | null;
  userLevel: {
    name: string;
    icon: string;
    id: number;
    progress: number;
    newLvl: boolean;
    params: {
      discussionBoards: number;
      followers: number;
      followings: number;
      ratings: number;
      reviews: number;
      watchlisted: number;
    };
  };
  username: string;
  verified: number;
  watchListCount: number;
  webDevice: null;
  proActive: boolean;
};

export interface IMyProfile extends IUserProfile {
  country: { id: number; code: string; name: string };
  countryCode: string;
  email: string;
  isNeedVerifyEmail: boolean;
  lastProSubscribe: null;
  lastProUnsubscribe: null;
  nextProAutosubscribe: null;
  subscribeType: null;
  firstProSubscribe: number | null;
  deviceId: null;
  deviceToken: string;
  averageRating: string;
  googleId: string;
  appleId: null;
  purchaseRef: string | null;
  purchaseToken: string | null;
  emailSecret: string;
  google2faSecret: string | null;
  sessionId: string;
}

export interface IUpdateProfileParams {
  userId: number;
  username: string;
  firstName: string;
  image: string | undefined;
  deleteImage: number;
  isTranslationActive: string;
  lastName: string;
}

export interface IUpdateCountryParams {
  countryCode: string;
  userId: number;
}

export interface IMovieParams {
  userId: number;
  movieId: number;
  lang: string;
  page: number;
}

export interface IMovieReviewsParams extends IMovieParams {
  friends: 'only' | 'none';
}

export interface IFollowersParams {
  userId: number | undefined | null;
  lang: string;
  page: number;
  name?: string;
}

export interface IFollower {
  correlation: number;
  username: string;
  id: number;
  image: string;
  firstName: string;
  lastName: string;
}
