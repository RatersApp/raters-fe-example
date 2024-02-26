import { loginRedirector } from '../../features/Auth/common/common';
import {
  getSSMeta,
  getSSProps,
  getSSTrans,
} from '../../common/helpers/serverSideUtils';
import { addHeaders } from '../../common/helpers/addHeaders';
import dynamic from 'next/dynamic';

const Login = dynamic(() =>
  import('../../features/Auth/components/Login').then(
    (component) => component.Login,
  ),
);

export const getServerSideProps = getSSProps(
  [getSSMeta('static-login'), getSSTrans()],
  loginRedirector,
);

export default addHeaders(Login);
