import { isEmpty } from '../helpers/empty';
import { useRouter } from 'next/router';

export const useVideoSlug = () => {
  const router = useRouter();
  let { videoSlug } = router.query as { videoSlug: string };

  if (isEmpty(videoSlug)) {
    videoSlug = undefined;
  }

  return { videoSlug };
};
