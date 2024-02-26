import axios from 'axios';
import { API_KEY } from './routes';
import { manyAttemptsWorkaround } from './baseQuery';
import { syncStorage } from '../helpers/syncStorage';

export const config = {
  apiKey: API_KEY,
};

const configureRequests = () => {
  const instance = axios.create({
    headers: config,
  });
  instance.interceptors.request.use((req) => {
    req.headers['lang'] = syncStorage.userLang;
    req.headers['app-type'] = 'web';
    const token = syncStorage.token;
    if (token) {
      req.headers['Authorization'] = `Bearer ${token}`;
    }
    return req;
  });
  instance.interceptors.response.use((res) => {
    return manyAttemptsWorkaround(res, () => instance.request(res.config));
  });

  return instance;
};

const client = configureRequests();

export default client;
