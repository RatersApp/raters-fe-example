import {
  getSSCanonical,
  getSSMetaGlossary,
  getSSTrans,
  getStoreProps,
} from '../../common/helpers/serverSideUtils';
import { fetchMoviesGlossaryStart } from '../../features/Glossary/duck/glossaryActions';
import dynamic from 'next/dynamic';
import { addHeaders } from '../../common/helpers/addHeaders';

const GlossaryContainer = dynamic(
  () => import('../../features/Glossary/GlossaryContainer'),
);

export const getServerSideProps = getStoreProps(
  ({ dispatch }, ctx) => {
    dispatch(
      fetchMoviesGlossaryStart({
        page: ctx.query.page,
        lang: ctx.locale,
      }),
    );
  },
  [getSSMetaGlossary('movie'), getSSCanonical, getSSTrans()],
);
export default addHeaders(() => <GlossaryContainer page={'/movies'} />);
