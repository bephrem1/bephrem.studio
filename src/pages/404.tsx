import { EmptyObject } from '../types/empty';
import { FunctionComponent } from 'react';
import Head from 'next/head';
import NotFound from '../components/page-segments/not-found/NotFound';
import PageBase from '../components/shared/page/PageBase';
import { useDocumentHeadComponents } from '../hooks/page-headers';

const NotFoundPage: FunctionComponent<EmptyObject> = () => {
  const { SEOTags } = useDocumentHeadComponents({
    title: 'bephrem.studio | Not Found'
  });

  return (
    <PageBase>
      <Head>{SEOTags}</Head>
      <NotFound />
    </PageBase>
  );
};

export default NotFoundPage;
