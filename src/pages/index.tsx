import { EmptyObject } from '../types/empty';
import { FunctionComponent } from 'react';
import Head from 'next/head';
import Home from '../components/page-segments/home/Home';
import PageBase from '../components/shared/page/PageBase';
import { useDocumentHeadComponents } from '../hooks/page-headers';

const RootHomePage: FunctionComponent<EmptyObject> = () => {
  const { SEOTags } = useDocumentHeadComponents({
    title: 'bephrem.studio',
    description: 'Videos by Benyam Ephrem.'
  });

  return (
    <PageBase>
      <Head>{SEOTags}</Head>
      <Home />
    </PageBase>
  );
};

export default RootHomePage;
