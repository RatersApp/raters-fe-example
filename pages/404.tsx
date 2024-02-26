import dynamic from 'next/dynamic';
import type { GetStaticProps } from 'next';
import { getSSTrans } from '../common/helpers/serverSideUtils';

const PageContainer404 = dynamic(
  () => import('../features/404/404PageContainer'),
);

export const getStaticProps: GetStaticProps = async (context) => ({
  props: await getSSTrans()(context),
});

export default function custom404page() {
  return <PageContainer404 />;
}
