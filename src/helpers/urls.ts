import { NextRouter } from 'next/router';

export const INTERNAL_LINKS = {
  HOME: '/',
  LONGFORM: '/longform',
  VIDEO_DETAIL: ({ slug }: { slug: string }) => `/videos/${slug}`,
  SHORTFORM: '/shortform',
  ABOUT: '/about'
};

export const EXTERNAL_LINKS = {
  SOCIAL: {
    INSTAGRAM: 'https://www.instagram.com/bephrem_',
    YOUTUBE: 'https://youtube.com/@bephrem',
    WEBSITE: 'https://bephrem.com'
  },
  GITHUB: {
    REPO: 'https://github.com/bephrem1/bephrem.studio'
  }
};

export const getCurrentUrl = (router: NextRouter) => {
  return getFrontendUrl({ path: router.asPath });
};

export const getFrontendUrl = ({
  path,
  params
}: {
  path: string;
  params?: Record<string, string>;
}) => {
  return getUrlToResource(getBaseFrontendUrl(), path, params);
};

const getUrlToResource = (
  baseUrl: string,
  resourcePath: string,
  params?: Record<string, string>
) => {
  // Adjust for trailing slash
  if (!!resourcePath && resourcePath.charAt(resourcePath.length - 1) === '/') {
    resourcePath = resourcePath.substring(0, resourcePath.length - 1);
  }

  // Adjust for leading slash
  if (!!resourcePath && resourcePath.charAt(0) !== '/') {
    resourcePath = '/' + resourcePath;
  }

  const queryParamString = params ? getQueryParamString(params) : '';

  return baseUrl + resourcePath + queryParamString;
};

const getQueryParamString = (params: Record<string, string>): string => {
  if (!params) {
    return '';
  }

  const paramItems = Object.keys(params).map((paramLabel: string) => {
    return `${encodeURIComponent(paramLabel)}=${encodeURIComponent(params[paramLabel])}`;
  });

  return `?${paramItems.join('&')}`;
};

const getBaseFrontendUrl = () => {
  return getBaseUrl({
    host: process.env.NEXT_PUBLIC_HOSTNAME,
    port: process.env.NEXT_PUBLIC_HOSTNAME === 'localhost' ? ':3000' : ''
  });
};

interface BaseUrlOptions {
  host: string;
  port: string;
  suffix?: string;
}
const getBaseUrl = ({ host, port, suffix }: BaseUrlOptions) => {
  const protocol = host === 'localhost' ? 'http' : 'https';

  return `${protocol}://${host}${port}${!!suffix ? suffix : ''}`;
};
