import { HeaderBackButton } from '@/component/header/HeaderBackButton.tsx';
import { HeaderDropdown } from '@/component/header/HeaderDropdown.tsx';
import { IItem } from '@/component/header/HeaderLayout.tsx';
import React from 'react';
import { MdInfo } from 'react-icons/md';

export const HEADER_TITLE: Record<string, string> = {
  '/add-channel/:user/draw': '에 따른 경로 설정',
};

export const HEADER_SUBTITLE: Record<string, string> = {
  '/add-channel/:user/draw': '사용자 별로 출발지/도착지(마커), 경로(그림)을 설정할 수 있습니다',
};

export const HEADER_SUBTITLEICONS: Record<string, React.ComponentType> = {
  '/add-channel/:user/draw': MdInfo,
};

export const HEADER_LEFTITEMS: Record<string, IItem[]> = {
  '/add-channel': [{ id: 'item1', content: React.createElement(HeaderBackButton) }],
  '/add-channel/:user': [{ id: 'item1', content: React.createElement(HeaderBackButton) }],
  '/add-channel/:user/draw': [{ id: 'item1', content: React.createElement(HeaderBackButton) }],
  '/channel/:channelId/host': [{ id: 'item1', content: React.createElement(HeaderBackButton) }],
  '/update-channel': [{ id: 'item1', content: React.createElement(HeaderBackButton) }],
  '/register': [{ id: 'item1', content: React.createElement(HeaderBackButton) }],
  '/channelInfo/:channelId': [{ id: 'item1', content: React.createElement(HeaderBackButton) }],
  '/guest-add-channel/:channelId': [
    { id: 'item1', content: React.createElement(HeaderBackButton) },
  ],
};

export const HEADER_RIGHTITEMS: Record<string, IItem[]> = {
  '/channel/:channelId/host': [{ id: 'item1', content: React.createElement(HeaderDropdown) }],
};
