import { loginRedirector } from '../../../../features/Auth/common/common';
import { addHeaders } from '../../../../common/helpers/addHeaders';
import {
  getSSMeta,
  getSSProps,
  getSSTrans,
} from '../../../../common/helpers/serverSideUtils';
import dynamic from 'next/dynamic';

const EmailVerification = dynamic(() =>
  import('../../../../features/Auth/components/EmailChange').then(
    (component) => component.EmailChange,
  ),
);

export const getServerSideProps = getSSProps(
  [getSSMeta('static-login'), getSSTrans()],
  loginRedirector,
);

export default addHeaders(EmailVerification);
