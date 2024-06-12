import { FunctionComponent } from 'react';
import { ShortformVideoMetadata } from '../../../../../fixtures';
import { VideoAspectRatio } from '../..';
import VideoPlayer from '../VideoPlayer';
import { getMuxPlaybackUrl } from '../../../../../helpers/video';
import tinycolor from 'tinycolor2';

interface Props {
  videoData: ShortformVideoMetadata;
  className?: string;
}

const ShortformVideoPlayer: FunctionComponent<Props> = ({ videoData, className }) => {
  const { title, thumbnailUrl, playbackId } = videoData;

  const videoUrl = getMuxPlaybackUrl({ playbackId });

  const controlsBackdropColor = tinycolor('#000000').setAlpha(0.4).toRgbString();

  return (
    <VideoPlayer
      className={className}
      style={{ maxWidth: '90vw' }}
      videoUrl={videoUrl}
      videoTitle={title}
      thumbnailUrl={thumbnailUrl}
      aspectRatio={VideoAspectRatio.PORTRAIT}
      loop
      hideControlsSetting={{
        seekBackward: true,
        seekForward: true,
        captions: true,
        pip: true,
        playbackRate: true,
        timeDisplay: true
      }}
      controlsBackdropColor={controlsBackdropColor}
    />
  );
};

export default ShortformVideoPlayer;
