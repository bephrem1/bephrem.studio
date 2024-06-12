import { FunctionComponent } from 'react';
import { ShortformVideoMetadata } from '../../../../fixtures';
import ShortformVideoPlayer from '../../../shared/video/player/lib/ShortformVideoPlayer';
import { VIDEOS } from '../../../../fixtures/videos';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface Props {
  onlyFeatured?: boolean;
  hideDividers?: boolean;

  className?: string;
}

const sections = ({ onlyFeatured }: { onlyFeatured: boolean }) => {
  return [
    {
      title: 'favorites',
      videos: [
        VIDEOS.SHORTFORM.PUNCHING_BAG_MAZE,
        VIDEOS.SHORTFORM.RILEY_HIGH_JUMP,
        VIDEOS.SHORTFORM.DOCK_OF_THE_BAY,
        VIDEOS.SHORTFORM.AINT_NO_WOMAN_LIKE_THE_ONE_I_GOT
      ]
    },
    ...(!onlyFeatured
      ? [
          {
            title: 'other favorites',
            videos: [
              VIDEOS.SHORTFORM.TAYLOR_SPARRING,
              VIDEOS.SHORTFORM.HELL_4_A_HUSTLA,
              VIDEOS.SHORTFORM.MORE_THAN_A_WOMAN,
              VIDEOS.SHORTFORM.STREET_FC_EDIT
            ]
          },
          {
            title: 'other',
            videos: [VIDEOS.SHORTFORM.SURF_SURF_SURF, VIDEOS.SHORTFORM.PANHANDLE_PICKUP]
          },
          {
            title: 'old',
            videos: [
              VIDEOS.SHORTFORM.ZANDER_ZOOMIN,
              VIDEOS.SHORTFORM.TAKODA_EDIT_1,
              VIDEOS.SHORTFORM.TAKODA_NAVY_YARD,
              VIDEOS.SHORTFORM.I_GOT_A_SHOT
            ]
          }
        ]
      : [])
  ];
};

const ShortformSections: FunctionComponent<Props> = ({ onlyFeatured, hideDividers, className }) => {
  const displaySections = sections({ onlyFeatured });

  return (
    <div className={twMerge('flex flex-col w-full', className)}>
      {displaySections.map((sectionData) => {
        return (
          <Section
            key={sectionData.title}
            label={sectionData.title}
            VideoGrid={<VideoGrid videos={sectionData.videos} />}
            hideDividers={hideDividers}
          />
        );
      })}
    </div>
  );
};

const Section = ({ label, VideoGrid, hideDividers }) => {
  return (
    <div className="flex flex-col w-full mb-8 sm:mb-3">
      {!hideDividers ? <Divider className="mb-8" label={label} /> : null}

      {VideoGrid}
    </div>
  );
};

const VideoGrid = ({ videos }: { videos: Array<ShortformVideoMetadata> }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-center w-full">
      {videos.map((video) => {
        return (
          <div
            key={video.playbackId}
            className={clsx([
              'flex',
              'flex-col items-center',
              'mr-0 mb-8 last:mb-0',
              'sm:mr-5 sm:last:mr-0'
            ])}
          >
            <ShortformVideoPlayer className="w-[425px] sm:w-[350px]" videoData={video} />
          </div>
        );
      })}
    </div>
  );
};

const Divider = ({ label, className }) => {
  return (
    <div className={twMerge('flex flex-row w-full items-center justify-between', className)}>
      <div className="bg-neutral-700 w-1/4 sm:w-[35%]" style={{ height: '0.5px' }} />
      <div className="flex flex-row items-center justify-center">
        <p className="text-neutral-500 text-sm text-nowrap">{label}</p>
      </div>
      <div className="bg-neutral-700 w-1/4 sm:w-[35%]" style={{ height: '0.5px' }} />
    </div>
  );
};

export default ShortformSections;
