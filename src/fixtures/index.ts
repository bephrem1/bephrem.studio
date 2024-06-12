import { VIDEOS } from './videos';
import { VideoAspectRatio } from '../components/shared/video';

interface VideoMetadataBase {
  title: string;
  slug: string;
  aspectRatio: VideoAspectRatio;
  thumbnailUrl: string;
  playbackId: string;
  createdOn: string;
}

export interface ShortformVideoMetadata extends VideoMetadataBase {}
export interface LongformVideoMetadata extends VideoMetadataBase {
  posterGifUrl?: string;
  freezeFrames?: Array<string>;
  credits?: Array<string>;
}

export type VideoMetadata = ShortformVideoMetadata | LongformVideoMetadata;

export const getVideoMetadataBySlug = ({ slug }): VideoMetadata => {
  const allVideoData = [...Object.values(VIDEOS.SHORTFORM), ...Object.values(VIDEOS.LONGFORM)];

  return allVideoData.find((videoData) => videoData.slug === slug);
};
