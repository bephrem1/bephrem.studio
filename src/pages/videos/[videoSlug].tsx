import React, { FunctionComponent } from 'react';

import { EmptyObject } from '../../types/empty';
import Head from 'next/head';
import PageBase from '../../components/shared/page/PageBase';
import VideoDetail from '../../components/page-segments/video-detail/VideoDetail';
import { getVideoMetadataBySlug } from '../../fixtures';
import { useVideoSlug } from '../../hooks/query-params';

const VideoDetailPage: FunctionComponent<EmptyObject> = () => {
  const { videoSlug } = useVideoSlug();

  const videoData = getVideoMetadataBySlug({ slug: videoSlug });

  return (
    <PageBase>
      <Head>
        <title>{videoData?.title}</title>
        <meta key="description" name="description" content="Videos by Benyam Ephrem." />
      </Head>
      <VideoDetail videoData={videoData} />
    </PageBase>
  );
};

export default VideoDetailPage;
