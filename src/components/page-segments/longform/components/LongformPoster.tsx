import { FunctionComponent } from 'react';
import { INTERNAL_LINKS } from '../../../../helpers/urls';
import Link from '../../../shared/elements/Link';
import { LongformVideoMetadata } from '../../../../fixtures';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface Props {
  videoData: LongformVideoMetadata;

  className?: string;
}

const LongformPoster: FunctionComponent<Props> = ({ videoData, className }) => {
  const dest = INTERNAL_LINKS.VIDEO_DETAIL({ slug: videoData.slug });

  const year = extractYear(videoData.createdOn);

  return (
    <div className={twMerge('group/poster w-full', className)}>
      <Link type="internal" dest={dest} fillContainer>
        <div className="relative flex flex-col h-full group-hover/poster:cursor-pointer">
          <HoverLabel videoTitle={videoData.title} videoYear={year} />
          <HoverShader />

          <img
            className="w-full hover:opacity-50 group-hover/poster:grayscale z-20 transition-all duration-300 ease-in-out"
            src={videoData.thumbnailUrl}
            draggable="false"
          />
        </div>
      </Link>
    </div>
  );
};

const HoverShader = () => {
  const className = clsx({
    'absolute top-0 left-0': true,
    'w-full h-full': true,
    'bg-neutral-950': true,
    'opacity-0 group-hover/poster:opacity-75': true,
    'transition-all duration-300 ease-in-out': true,
    'z-30': true
  });

  return <div className={className} />;
};

const HoverLabel = ({ videoTitle, videoYear }) => {
  const className = clsx({
    'absolute top-0 left-0': true,
    'flex flex-col items-center justify-center': true,
    'w-full h-full px-8': true,
    'opacity-0 group-hover/poster:opacity-100': true,
    'transition-all duration-300 ease-in-out': true,
    'z-40': true
  });

  return (
    <div className={className}>
      <p className="text-neutral-100 font-medium text-center mb-2">{videoTitle}</p>
      <p className="text-neutral-500">{videoYear}</p>
    </div>
  );
};

const extractYear = (dateString: string) => {
  const date = new Date(dateString);

  return date.getFullYear().toString();
};

export default LongformPoster;
