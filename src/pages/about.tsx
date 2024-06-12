import About from '../components/page-segments/about/About';
import { EmptyObject } from '../types/empty';
import { FunctionComponent } from 'react';
import Head from 'next/head';
import PageBase from '../components/shared/page/PageBase';
import { useDocumentHeadComponents } from '../hooks/page-headers';

const AboutPage: FunctionComponent<EmptyObject> = () => {
  const { SEOTags } = useDocumentHeadComponents({
    title: 'bephrem.studio | About',
    description: 'About Benyam Ephrem.'
  });

  return (
    <PageBase>
      <Head>{SEOTags}</Head>
      <About />
    </PageBase>
  );
};

export default AboutPage;
