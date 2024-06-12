import { EmptyObject } from '../../../../types/empty';
import { FunctionComponent } from 'react';
import LongformPoster from './LongformPoster';
import { VIDEOS } from '../../../../fixtures/videos';

const videos = [VIDEOS.LONGFORM.FEEL_THE_FIRE];

const LongformPosters: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="flex flex-col flex-wrap sm:flex-row w-full items-center sm:justify-center">
      {videos.map((video) => {
        return (
          <LongformPoster
            key={video.playbackId}
            className="w-full sm:w-1/4 mr-0 sm:mr-3.5 mb-3 sm:mb-3"
            videoData={video}
          />
        );
      })}
    </div>
  );
};

export default LongformPosters;
