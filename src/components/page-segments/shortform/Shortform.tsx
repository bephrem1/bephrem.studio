import React, { FunctionComponent } from 'react';

import { EmptyObject } from '../../../types/empty';
import Navbar from '../../shared/navigation/Navbar';
import ShortformSections from './components/ShortformSections';
import SiteLayout from '../../shared/layout/SiteLayout';

const Shortform: FunctionComponent<EmptyObject> = () => {
  return (
    <SiteLayout>
      <Navbar />

      <ShortformSections className="mt-6 sm:mt-8 pb-16" />
    </SiteLayout>
  );
};

export default Shortform;
