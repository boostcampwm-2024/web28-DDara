import { HiLocationMarker, HiOutlineLocationMarker, HiOutlineDotsHorizontal } from 'react-icons/hi';
import { FaPaintBrush } from 'react-icons/fa';
import { SlLayers } from 'react-icons/sl';

export enum ButtonType {
  CLOSE = 'CLOSE',
  OPEN = 'OPEN',
  START_MARKER = 'START_MARKER',
  DESTINATION_MARKER = 'DESTINATION_MARKER',
  LINE_DRAWING = 'LINE_DRAWING',
}

export const IconType = {
  CLOSE: SlLayers,
  OPEN: HiOutlineDotsHorizontal,
  START_MARKER: HiLocationMarker,
  DESTINATION_MARKER: HiOutlineLocationMarker,
  LINE_DRAWING: FaPaintBrush,
};

export const ToolCategory = [
  {
    type: ButtonType.LINE_DRAWING,
    description: '경로 그리기',
    icon: IconType.LINE_DRAWING,
  },
  {
    type: ButtonType.START_MARKER,
    description: '출발지 설정',
    icon: IconType.START_MARKER,
  },
  {
    type: ButtonType.DESTINATION_MARKER,
    description: '도착지 설정',
    icon: IconType.DESTINATION_MARKER,
  },
];
