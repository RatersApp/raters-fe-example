import dynamic from 'next/dynamic';
import { addHeaders } from '../../common/helpers/addHeaders';
import {
  getSSMeta,
  getSSProps,
  getSSTrans,
} from '../../common/helpers/serverSideUtils';

const FundraiserPage = dynamic(() =>
  import('../../features/Fundraiser/FundraiserPage').then(
    (e) => e.FundraiserPage,
  ),
);

export const getServerSideProps = getSSProps([
  getSSMeta('fundraising'),
  getSSTrans('default'),
]);

export default addHeaders(FundraiserPage);
