import React, { FunctionComponent } from 'react';

import { LongformVideoMetadata } from '../../../fixtures';
import LongformVideoPlayer from '../../shared/video/player/lib/LongformVideoPlayer';
import Navbar from '../../shared/navigation/Navbar';
import SiteLayout from '../../shared/layout/SiteLayout';
import { isEmpty } from '../../../helpers/empty';

interface Props {
  videoData: LongformVideoMetadata;
}

const VideoDetail: FunctionComponent<Props> = ({ videoData }) => {
  if (!videoData) {
    return null;
  }

  return (
    <SiteLayout>
      <Navbar />

      <div className="flex flex-col items-center pt-8 sm:pt-12 pb-16">
        <div className="flex flex-col items-center w-full mb-8">
          <div className="max-w-[300px] sm:max-w-[550px]">
            <p className="text-neutral-100 text-2xl font-medium text-center sm:text-left sm:mb-2">
              {videoData.title}
            </p>
            {!isEmpty(videoData.credits) ? <Credits credits={videoData.credits} /> : null}
          </div>
        </div>

        <div className="flex flex-col items-center w-full max-w-[750px] mb-8">
          <LongformVideoPlayer className="w-full" videoData={videoData} />
        </div>

        <div className="flex flex-col w-full max-w-[900px]">
          {!isEmpty(videoData.freezeFrames) ? (
            <FreezeFrames stillImageUrls={videoData.freezeFrames} />
          ) : null}
        </div>
      </div>
    </SiteLayout>
  );
};

const Credits = ({ credits }: { credits: Array<string> }) => {
  return (
    <div className="flex flex-col pt-4">
      {credits.map((credit) => {
        return (
          <p key={credit} className="text-neutral-400 mb-2 last:mb-0">
            {credit}
          </p>
        );
      })}
    </div>
  );
};

const FreezeFrames = ({ stillImageUrls }: { stillImageUrls: Array<string> }) => {
  return (
    <div className="flex flex-col pt-8">
      {stillImageUrls.map((stillImageUrl) => {
        return (
          <img
            key={stillImageUrl}
            className="w-full mb-2.5 last:mb-0"
            src={stillImageUrl}
            draggable={false}
          />
        );
      })}
    </div>
  );
};

export default VideoDetail;
