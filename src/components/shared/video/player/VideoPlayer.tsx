import { FunctionComponent, useContext, useEffect, useRef, useState } from 'react';

import MuxPlayer from '@mux/mux-player-react';
import MuxPlayerElement from '@mux/mux-player/.';
import { VideoAspectRatio } from '..';
import { VideoContext } from '../../../../context/video';
import { isEmpty } from '../../../../helpers/empty';
import { twMerge } from 'tailwind-merge';
import { useVideoPlayerEvent } from '../../../../hooks/video';

interface HideableControls {
  play?: boolean;
  seekBackward?: boolean;
  seekForward?: boolean;
  mute?: boolean;
  captions?: boolean;
  pip?: boolean;
  fullscreen?: boolean;
  playbackRate?: boolean;
  volumeSlider?: boolean;
  timeSlider?: boolean;
  timeDisplay?: boolean;
  durationDisplay?: boolean;
  qualitySelector?: boolean;
  all?: boolean;
}

interface Props {
  videoUrl: string;
  videoTitle?: string;
  thumbnailUrl?: string;
  startTimeSeconds?: number;
  setVideoPlayerRef?: (ref: MuxPlayerElement) => void;
  onPlay?: () => void;
  onPause?: () => void;
  autoPlay?: boolean;
  hideControlsSetting?: HideableControls;
  controlsPrimaryColor?: string;
  controlsBackdropColor?: string;
  forwardSeekOffset?: number;
  backwardSeekOffset?: number;
  loop?: boolean;
  aspectRatio?: VideoAspectRatio | string;

  className?: string;
  style?: React.CSSProperties;
}

const DEFAULT_PLAYBACK_RATE = 1;

const VideoPlayer: FunctionComponent<Props> = ({
  videoUrl,
  videoTitle,
  thumbnailUrl,
  startTimeSeconds,
  setVideoPlayerRef,
  onPlay,
  onPause,
  autoPlay,
  hideControlsSetting = {},
  controlsPrimaryColor,
  controlsBackdropColor,
  forwardSeekOffset,
  backwardSeekOffset,
  loop,
  aspectRatio,

  className: _className,
  style
}) => {
  const [player, set_player] = useState(undefined);
  const _setVideoPlayerReference = (ref: MuxPlayerElement) => {
    if (!isEmpty(ref)) {
      setVideoPlayerRef && setVideoPlayerRef(ref);
      set_player(ref);
    }
  };

  const { _play, _pause, isBackgrounded } = useBackgrounding({ videoUrl, onPlay, onPause, player });

  useVideoPlayerEvent({ event: 'play', fn: _play, player });
  useVideoPlayerEvent({ event: 'pause', fn: _pause, player });

  const containerClassName = twMerge('flex flex-row rounded-sm', _className);
  const containerStyle = {
    ...style,
    overflow: 'hidden'
  };
  const playerStyle = getPlayerStyle({ hideControlsSetting, aspectRatio, isBackgrounded });

  return (
    <div className={containerClassName} style={containerStyle}>
      <MuxPlayer
        ref={_setVideoPlayerReference}
        src={videoUrl}
        startTime={startTimeSeconds}
        playbackRate={DEFAULT_PLAYBACK_RATE}
        forwardSeekOffset={forwardSeekOffset}
        backwardSeekOffset={backwardSeekOffset}
        poster={thumbnailUrl}
        streamType="on-demand"
        autoPlay={autoPlay}
        muted={autoPlay}
        loop={loop}
        metadata={{
          video_title: videoTitle
        }}
        {...(!isEmpty(controlsPrimaryColor) ? { primaryColor: controlsPrimaryColor } : {})}
        {...(!isEmpty(controlsBackdropColor) ? { secondaryColor: controlsBackdropColor } : {})}
        style={playerStyle}
      />
    </div>
  );
};

const getPlayerStyle = ({
  hideControlsSetting,
  aspectRatio,
  isBackgrounded
}: {
  hideControlsSetting: HideableControls;
  aspectRatio: VideoAspectRatio | string;
  isBackgrounded: boolean;
}): any => {
  const controlsHideStyle = getControlHideStyles({ hideControlsSetting, isBackgrounded });
  const aspectRatioStyle = getAspectRatioStyle(aspectRatio);

  return {
    ...controlsHideStyle,
    ...aspectRatioStyle,
    ...(isBackgrounded ? { opacity: 0.2 } : {}),
    transition: 'all .3s ease'
  };
};

const getAspectRatioStyle = (aspectRatio: VideoAspectRatio | string) => {
  if (isEmpty(aspectRatio)) {
    return {};
  }

  const [width, height] = aspectRatio.split(':');

  return {
    'aspect-ratio': `${width} / ${height}`
  };
};

const getControlHideStyles = ({
  hideControlsSetting,
  isBackgrounded
}: {
  hideControlsSetting: HideableControls;
  isBackgrounded: boolean;
}) => {
  if (isEmpty(hideControlsSetting)) {
    return {};
  }

  const {
    play,
    seekBackward,
    seekForward,
    mute,
    captions,
    pip,
    fullscreen,
    playbackRate,
    volumeSlider,
    timeSlider,
    timeDisplay,
    durationDisplay,
    qualitySelector,
    all
  } = hideControlsSetting;

  return {
    ...(play ? { '--play-button': 'none' } : {}),
    ...(seekBackward ? { '--seek-backward-button': 'none' } : {}),
    ...(seekForward ? { '--seek-forward-button': 'none' } : {}),
    ...(mute ? { '--mute-button': 'none' } : {}),
    ...(captions ? { '--captions-button': 'none' } : {}),
    ...(pip ? { '--pip-button': 'none' } : {}),
    ...(fullscreen ? { '--fullscreen-button': 'none' } : {}),
    ...(playbackRate ? { '--playback-rate-button': 'none' } : {}),
    ...(volumeSlider ? { '--volume-range': 'none' } : {}),
    ...(timeSlider ? { '--time-range': 'none' } : {}),
    ...(timeDisplay ? { '--time-display': 'none' } : {}),
    ...(durationDisplay ? { '--duration-display': 'none' } : {}),
    ...(qualitySelector ? { '--rendition-selectmenu': 'none' } : {}),
    ...(all || isBackgrounded ? { '--controls': 'none' } : {})
  };
};

const useBackgrounding = ({ videoUrl, onPlay, onPause, player }) => {
  const getVideoId = () => videoUrl;

  const { playingVideoId, setPlayingVideoId } = useContext(VideoContext);
  const _play = () => {
    if (onPlay) {
      onPlay();
    }

    setPlayingVideoId(getVideoId());
  };

  const playingVideoIdRef = useRef(playingVideoId);
  useEffect(() => {
    playingVideoIdRef.current = playingVideoId;
  }, [playingVideoId]);

  const _pause = () => {
    if (onPause) {
      onPause();
    }

    const _playingVideoId = playingVideoIdRef.current;
    if (_playingVideoId === getVideoId()) {
      setPlayingVideoId(undefined);
    }
  };

  const [isBackgrounded, setIsBackgrounded] = useState(false);
  useEffect(() => {
    if (playingVideoId && playingVideoId !== getVideoId()) {
      setIsBackgrounded(true);
    } else {
      setIsBackgrounded(false);
    }
  }, [playingVideoId]);
  useEffect(() => {
    if (isBackgrounded) {
      player?.pause();
    }
  }, [isBackgrounded]);

  return { isBackgrounded, _play, _pause };
};

export default VideoPlayer;
