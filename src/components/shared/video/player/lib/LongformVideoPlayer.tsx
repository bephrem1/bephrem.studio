import { FunctionComponent } from 'react';
import { LongformVideoMetadata } from '../../../../../fixtures';
import { VideoAspectRatio } from '../..';
import VideoPlayer from '../VideoPlayer';
import { getMuxPlaybackUrl } from '../../../../../helpers/video';
import tinycolor from 'tinycolor2';

interface Props {
  videoData: LongformVideoMetadata;
  className?: string;
}

const LongformVideoPlayer: FunctionComponent<Props> = ({ videoData, className }) => {
  const { title, thumbnailUrl, playbackId } = videoData;

  const videoUrl = getMuxPlaybackUrl({ playbackId });

  const controlsBackdropColor = tinycolor('#000000').setAlpha(0.4).toRgbString();

  return (
    <VideoPlayer
      className={className}
      videoUrl={videoUrl}
      videoTitle={title}
      thumbnailUrl={thumbnailUrl}
      aspectRatio={VideoAspectRatio.LANDSCAPE_STANDARD}
      loop={false}
      forwardSeekOffset={15}
      backwardSeekOffset={5}
      hideControlsSetting={{
        playbackRate: true
      }}
      controlsBackdropColor={controlsBackdropColor}
    />
  );
};

export default LongformVideoPlayer;
