import { HeaderBackButton } from '@/component/header/HeaderBackButton';
import { HeaderDropdown } from '@/component/header/HeaderDropdown';
import React, { ReactNode } from 'react';

export const HEADER_TITLE: Record<string, string> = {
  '/add-channel/:user/draw': '에 따른 경로 설정',
};

export const HEADER_SUBTITLE: Record<string, string> = {
  '/add-channel/:user/draw': '사용자 별로 출발지/도착지(마커), 경로(그림)을 설정할 수 있습니다',
};

export const HEADER_LEFTITEMS: Record<string, ReactNode[]> = {
  '/add-channel': [React.createElement(HeaderBackButton)],
  '/add-channel/:user': [React.createElement(HeaderBackButton)],
  '/add-channel/:user/draw': [React.createElement(HeaderBackButton)],
  '/channel/:channelId/host': [React.createElement(HeaderBackButton)],
  '/update-channel': [React.createElement(HeaderBackButton)],
  '/register': [React.createElement(HeaderBackButton)],
  '/channelInfo/:channelId': [React.createElement(HeaderBackButton)],
  '/guest-add-channel/:channelId': [React.createElement(HeaderBackButton)],
};

export const HEADER_RIGHTITEMS: Record<string, ReactNode[]> = {
  '/channel/:channelId/host': [React.createElement(HeaderDropdown)],
};
