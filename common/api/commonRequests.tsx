import axios from 'axios';
import { OMDB_API, OMDB_API_KEY } from './routes';

export const fetchOMDBRatings = (id: string) =>
  axios
    .get(`${OMDB_API}`, {
      params: {
        i: id,
        tomatoes: true,
        apiKey: OMDB_API_KEY,
      },
    })
    .then((response) => response)
    .catch((e) => console.error(e));
