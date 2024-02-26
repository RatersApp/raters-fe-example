import { fetchMovieInfoStart } from '../../features/Movie/duck/movieActions';
import {
  getSSCanonical,
  getSSFullMeta,
  getSSTrans,
  getStoreProps,
} from '../../common/helpers/serverSideUtils';
import { GUEST_USER_ID } from '../../common/config/strings';
import dynamic from 'next/dynamic';
import { addHeaders } from '../../common/helpers/addHeaders';
import { syncStorage } from '../../common/helpers/syncStorage';

const MoviePageContainer = dynamic(() =>
  import('../../features/Movie').then(
    (component) => component.MoviePageContainer,
  ),
);

export const getServerSideProps = getStoreProps(
  ({ dispatch }, { query, locale }) => {
    const userId = syncStorage.userId || GUEST_USER_ID;

    dispatch(
      fetchMovieInfoStart({
        userId,
        movieId: Number(query.slug?.[0]),
        limit: 10,
        lang: locale,
      }),
    );
  },
  [
    getSSCanonical,
    getSSFullMeta(({ query }) => `movie/${query.slug?.[0]}`),
    getSSTrans(),
  ],
);

export default addHeaders(MoviePageContainer);
