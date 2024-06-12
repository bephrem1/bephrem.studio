import { FunctionComponent } from 'react';
import LongformPosters from '../longform/components/LongformPosters';
import Navbar from '../../shared/navigation/Navbar';
import ShortformSections from '../shortform/components/ShortformSections';
import SiteLayout from '../../shared/layout/SiteLayout';

interface Props {}

const Home: FunctionComponent<Props> = () => {
  return (
    <SiteLayout>
      <Navbar />

      <div className="pb-16 sm:pb-24">
        <ShortformSections className="mt-7 sm:mt-14 mb-16 sm:mb-16" onlyFeatured hideDividers />
        <LongformPosters />
      </div>
    </SiteLayout>
  );
};

export default Home;
