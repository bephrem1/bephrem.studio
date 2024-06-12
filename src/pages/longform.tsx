import React, { FunctionComponent } from 'react';

import { EmptyObject } from '../types/empty';
import Head from 'next/head';
import Longform from '../components/page-segments/longform/Longform';
import PageBase from '../components/shared/page/PageBase';
import { useDocumentHeadComponents } from '../hooks/page-headers';

const LongformPage: FunctionComponent<EmptyObject> = () => {
  const { SEOTags } = useDocumentHeadComponents({
    title: 'bephrem.studio | Longform'
  });

  return (
    <PageBase>
      <Head>{SEOTags}</Head>
      <Longform />
    </PageBase>
  );
};

export default LongformPage;
