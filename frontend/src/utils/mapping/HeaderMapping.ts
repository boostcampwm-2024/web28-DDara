import {
  HEADER_LEFTITEMS,
  HEADER_RIGHTITEMS,
  HEADER_SUBTITLE,
  HEADER_SUBTITLEICONS,
  HEADER_TITLE,
} from '@/layout/constant/HeaderConst';

const normalizePath = (path: string): string => {
  return path
    .replace(/\/add-channel\/[^/]+\/draw$/, '/add-channel/:user/draw') // `/add-channel/사용자1/draw` → `/add-channel/:user/draw`
    .replace(/\/add-channel\/[^/]+$/, '/add-channel/:user') // `/add-channel/사용자1` → `/add-channel/:user`
    .replace(/\/channel\/[^/]+\/host$/, '/channel/:channelId/host') // `/channel/123/host` → `/channel/:channelId/host`
    .replace(/\/channelInfo\/[^/]+$/, '/channelInfo/:channelId') // `/channelInfo/123` → `/channel/:channelId`
    .replace(/\/guest-add-channel\/[^/]+$/, '/guest-add-channel/:channelId') // `/guest-add-channel/123` → `/guest-add-channel/:channelId`
    .replace(/\/channel\/[^/]+\/guest\/[^/]+$/, '/channel/:channelId/guest/:guestId') // `/channel/123/guest/456` → `/channel/:channelId/guest/:guestId`
    .replace(/\/$/, '/'); // 루트 경로 유지
};

export const getHeaderInfo = (path: string) => {
  const normalizedPath = normalizePath(path);
  const title = HEADER_TITLE[normalizedPath] || '';
  const subtitle = HEADER_SUBTITLE[normalizedPath] || '';
  const subtitleIcons = HEADER_SUBTITLEICONS[normalizedPath];
  const leftItems = HEADER_LEFTITEMS[normalizedPath] || '';
  const rightItems = HEADER_RIGHTITEMS[normalizedPath] || '';

  return {
    title,
    subtitle,
    subtitleIcons,
    leftItems,
    rightItems,
  };
};
