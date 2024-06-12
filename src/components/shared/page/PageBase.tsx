import { FunctionComponent } from 'react';
import Head from 'next/head';
import React from 'react';

interface Props {
  children?: React.ReactNode;
}

const PageBase: FunctionComponent<Props> = ({ children }) => {
  return (
    <div id="root">
      <Head>
        <title>bephrem.studio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  );
};

export default PageBase;
