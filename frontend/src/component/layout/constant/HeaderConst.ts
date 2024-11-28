import { HeaderIcon } from '@/component/header/constatnt/HeaderEnums';

export const HEADER_TITLE: Record<string, string> = {
  '/add-channel/:user/draw': '에 따른 경로 설정',
};

export const HEADER_SUBTITLE: Record<string, string> = {
  '/add-channel/:user/draw': '사용자 별로 출발지/도착지(마커), 경로(그림)을 설정할 수 있습니다',
};

export const HEADER_LEFTBUTTON: Record<string, HeaderIcon> = {
  '/add-channel': HeaderIcon.BACK,
  '/add-channel/:user': HeaderIcon.BACK,
  '/add-channel/:user/draw': HeaderIcon.BACK,
  '/channel/:channelId/host': HeaderIcon.BACK,
  '/update-channel': HeaderIcon.BACK,
  '/register': HeaderIcon.BACK,
};

export const HEADER_RIGHTBUTTON: Record<string, HeaderIcon> = {
  '/channel/:channelId/host': HeaderIcon.MENU,
};
