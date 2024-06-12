import React, { FunctionComponent } from 'react';

import LongformPosters from './components/LongformPosters';
import Navbar from '../../shared/navigation/Navbar';
import SiteLayout from '../../shared/layout/SiteLayout';

interface Props {}

const Longform: FunctionComponent<Props> = () => {
  return (
    <SiteLayout>
      <Navbar />

      <div className="flex flex-col mt-6 sm:mt-12 pb-16">
        <LongformPosters />
      </div>
    </SiteLayout>
  );
};

export default Longform;
