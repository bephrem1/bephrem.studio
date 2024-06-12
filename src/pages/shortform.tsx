import React, { FunctionComponent } from 'react';

import { EmptyObject } from '../types/empty';
import Head from 'next/head';
import PageBase from '../components/shared/page/PageBase';
import Shortform from '../components/page-segments/shortform/Shortform';
import { useDocumentHeadComponents } from '../hooks/page-headers';

const ShortformPage: FunctionComponent<EmptyObject> = () => {
  const { SEOTags } = useDocumentHeadComponents({
    title: 'bephrem.studio | Shortform'
  });

  return (
    <PageBase>
      <Head>{SEOTags}</Head>
      <Shortform />
    </PageBase>
  );
};

export default ShortformPage;
