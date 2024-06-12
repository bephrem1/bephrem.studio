import { EmptyObject } from '../../../types/empty';
import { FunctionComponent } from 'react';
import Navbar from '../../shared/navigation/Navbar';
import SiteLayout from '../../shared/layout/SiteLayout';
import Socials from '../../shared/socials/Socials';
import clsx from 'clsx';

const About: FunctionComponent<EmptyObject> = () => {
  return (
    <SiteLayout>
      <Navbar />

      <div className="flex flex-grow items-center justify-center h-full">
        <AboutBlurb />
      </div>
    </SiteLayout>
  );
};

const AboutBlurb = () => {
  return (
    <div
      className={clsx([
        'flex',
        'flex-col w-full items-center',
        'sm:flex-row sm:w-fit sm:items-stretch sm:-translate-y-14'
      ])}
    >
      <div className="flex flex-col sm:flex-row">
        <div
          className={clsx([
            'flex flex-grow',
            'flex-row justify-center mb-8',
            'sm:flex-col sm:justify-center sm:mr-16'
          ])}
        >
          <img className="w-36 h-36 rounded-full" src="/images/ben.jpeg" draggable={false} />
        </div>
        <div className={clsx(['flex flex-col', 'max-w-[300px] mb-8', 'sm:max-w-[350px] sm:mr-16'])}>
          <p className="text-neutral-400 text-sm mb-4">about me:</p>
          <p className="text-neutral-200 mb-4">
            Hi, my name is Benyam Ephrem. I’m an Ethiopian-American software engineer who enjoys
            creating videos.
          </p>
          <p className="text-neutral-200 mb-4">
            I enjoy taking the same mental rigor of engineering & applying it creatively to
            planning, shooting, & editing videos.
          </p>
          <p className="text-neutral-200">
            What I love: taking that idea, that image, that mental movie in my head, & making it
            real in a beautiful form.
          </p>
        </div>
        <div className={clsx(['flex flex-grow flex-col', 'sm:justify-between'])}>
          <div>
            <p className="text-neutral-400 text-sm mb-2">contact:</p>
            <p className="text-neutral-200 text-sm">ben@bephrem.studio</p>
          </div>
          <div className="hidden sm:block">
            <Socials compressed />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
