import { syncStorage } from '../../../common/helpers/syncStorage';

export const loginRedirector = () => {
  if (syncStorage.userId) {
    return {
      destination: '/',
      permanent: false,
    };
  } else {
    return null;
  }
};

export const authRedirector = () => {
  if (syncStorage.userId) {
    return null;
  } else {
    return {
      destination: '/login',
      permanent: false,
    };
  }
};
