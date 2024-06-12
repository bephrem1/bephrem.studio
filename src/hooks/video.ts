import MuxPlayerElement from '@mux/mux-player/.';
import { isEmpty } from '../helpers/empty';
import { useEffect } from 'react';

export const useVideoPlayerEvent = ({
  event,
  fn,
  player
}: {
  event: string;
  player: MuxPlayerElement;
  fn: () => void;
}) => {
  useEffect(() => {
    if (!isEmpty(player) && !!fn) {
      player.addEventListener(event, fn);

      return () => {
        player.removeEventListener(event, fn);
      };
    }
  }, [player]);
};
