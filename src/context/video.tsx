import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

interface IVideoContext {
  playingVideoId: string;
  setPlayingVideoId: (_: string) => void;
}
export const VideoContext = React.createContext<IVideoContext>({
  playingVideoId: undefined,
  setPlayingVideoId: () => {}
});

export const VideoProvider = ({ children }: { children: any }) => {
  const [playingVideoId, setPlayingVideoId] = useState(undefined);
  useClearVideoPlayingOnRouteChange({ setPlayingVideoId });

  const value = {
    playingVideoId,
    setPlayingVideoId
  };

  return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>;
};

const useClearVideoPlayingOnRouteChange = ({ setPlayingVideoId }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setPlayingVideoId(undefined);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);
};
