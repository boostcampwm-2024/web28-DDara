import {
  HEADER_LEFTBUTTON,
  HEADER_RIGHTBUTTON,
  HEADER_SUBTITLE,
  HEADER_TITLE,
} from '@/component/layout/constant/HeaderConst';

const normalizePath = (path: string): string => {
  return path
    .replace(/\/add-channel\/[^/]+\/draw$/, '/add-channel/:user/draw') // `/add-channel/사용자1/draw` → `/add-channel/:user/draw`
    .replace(/\/add-channel\/[^/]+$/, '/add-channel/:user') // `/add-channel/사용자1` → `/add-channel/:user`
    .replace(/\/channel\/[^/]+\/host$/, '/channel/:channelId/host') // `/channel/123/host` → `/channel/:channelId/host`
    .replace(/\/channel\/[^/]+\/guest\/[^/]+$/, '/channel/:channelId/guest/:guestId') // `/channel/123/guest/456` → `/channel/:channelId/guest/:guestId`
    .replace(/\/$/, '/'); // 루트 경로 유지
};

export const getHeaderInfo = (path: string) => {
  const normalizedPath = normalizePath(path);
  const title = HEADER_TITLE[normalizedPath] || '';
  const subtitle = HEADER_SUBTITLE[normalizedPath] || '';
  const leftButton = HEADER_LEFTBUTTON[normalizedPath] || '';
  const rightButton = HEADER_RIGHTBUTTON[normalizedPath] || '';

  return {
    title,
    subtitle,
    leftButton,
    rightButton,
  };
};
