import React, { FunctionComponent } from 'react';

import { EmptyObject } from '../../../types/empty';
import { INTERNAL_LINKS } from '../../../helpers/urls';
import Link from '../elements/Link';
import Socials from '../socials/Socials';
import { twMerge } from 'tailwind-merge';
import { useIsOnPath } from '../../../hooks/urls';

const Navbar: FunctionComponent<EmptyObject> = () => {
  const onLongform = useIsOnPath(INTERNAL_LINKS.LONGFORM);
  const onShortform = useIsOnPath(INTERNAL_LINKS.SHORTFORM);
  const onAbout = useIsOnPath(INTERNAL_LINKS.ABOUT);

  const links = [
    ...(!onLongform ? [{ name: 'Longform', dest: INTERNAL_LINKS.LONGFORM }] : []),
    ...(!onShortform ? [{ name: 'Shortform', dest: INTERNAL_LINKS.SHORTFORM }] : []),
    ...(!onAbout ? [{ name: 'About', dest: INTERNAL_LINKS.ABOUT }] : [])
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row pt-6 sm:pt-12 justify-between">
        <div className="flex-1 flex">
          <Wordmark />
        </div>

        <div className="hidden sm:flex-1 sm:flex sm:justify-center">
          <NavLinks links={links} />
        </div>

        <div className="flex-1 flex justify-end">
          <Socials />
        </div>
      </div>
      <div className="mt-3.5 sm:mt-0 sm:hidden">
        <NavLinks className="justify-end" links={links} />
      </div>
    </div>
  );
};

const NavLinks = ({
  links,
  className: _className
}: {
  links: Array<{ name: string; dest: string }>;
  className?: string;
}) => {
  const className = twMerge('flex flex-row items-center', _className);

  return (
    <div className={className}>
      {links.map((link, index) => {
        const isLast = index === links.length - 1;

        return (
          <React.Fragment key={link.name}>
            <Link key={index} type="internal" dest={link.dest}>
              <p className="font-normal text-md sm:text-sm">{link.name}</p>
            </Link>
            {!isLast && <p className="text-neutral-100 mx-2">•</p>}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const Wordmark = () => {
  const onHomepage = useIsOnPath(INTERNAL_LINKS.HOME);

  return onHomepage ? (
    <span className="flex flex-row items-center h-fit leading-4 select-none">
      <p className="text-neutral-100 inline mr-2" style={{ fontWeight: 500 }}>
        bephrem.studio
      </p>
      <p className="text-neutral-100 inline" style={{ fontSize: '1rem', fontWeight: 500 }}>
        ☻
      </p>
    </span>
  ) : (
    <Link type="internal" dest={INTERNAL_LINKS.HOME}>
      <span className="leading-4">
        <p className="text-neutral-100 inline mr-2">bephrem.studio</p>
        <p className="text-neutral-100 inline" style={{ fontSize: '1rem' }}>
          ☻
        </p>
      </span>
    </Link>
  );
};

export default Navbar;
