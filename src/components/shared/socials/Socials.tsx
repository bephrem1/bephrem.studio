import { faGlobe, faLink } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

import { EXTERNAL_LINKS } from '../../../helpers/urls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent } from 'react';
import Link from '../elements/Link';
import clsx from 'clsx';

interface Props {
  compressed?: boolean;
}

const Socials: FunctionComponent<Props> = ({ compressed = false }) => {
  const socials = {
    youtube: EXTERNAL_LINKS.SOCIAL.YOUTUBE,
    instagram: EXTERNAL_LINKS.SOCIAL.INSTAGRAM,
    website: EXTERNAL_LINKS.SOCIAL.WEBSITE
  };

  return (
    <div className="flex flex-row whitespace-nowrap">
      {Object.entries(socials).map(([socialType, url]) => {
        if (!url) {
          return null;
        }

        return <SocialLink key={socialType} type={socialType} url={url} compressed={compressed} />;
      })}
    </div>
  );
};

const SocialIcon = ({ faIcon, compressed }) => {
  return (
    <FontAwesomeIcon
      icon={faIcon}
      className={clsx({
        'text-neutral-400': true,
        'w-3.5 h-3.5': compressed,
        'w-4 h-4': !compressed
      })}
    />
  );
};
const SocialLink = ({ type, url, compressed }) => {
  const getIcon = () => {
    switch (type) {
      case 'youtube':
        return <SocialIcon faIcon={faYoutube} compressed={compressed} />;
      case 'instagram':
        return <SocialIcon faIcon={faInstagram} compressed={compressed} />;
      case 'website':
        return <SocialIcon faIcon={faLink} compressed={compressed} />;
      default:
        return null;
    }
  };
  const Icon = getIcon();

  const className = clsx({
    'w-fit h-fit': true,
    'mr-2 sm:mr-2': compressed,
    'mr-3 sm:mr-2.5': !compressed,
    'last:mr-0 sm:last:mr-0': true
  });
  const containerClassName = clsx({
    'flex flex-row items-center justify-center': true,
    'bg-black hover:bg-neutral-900': true,
    'border border-solid border-neutral-800': true,
    'w-8 h-8 sm:w-7 sm:h-7': compressed,
    'w-9 h-9 sm:w-7 sm:h-7': !compressed,
    'rounded-lg': true
  });

  return (
    <div className={className}>
      <Link type="external" dest={url} fillContainer openInNewWindow>
        <div className={containerClassName}>{Icon}</div>
      </Link>
    </div>
  );
};

export default Socials;
