import { HiLocationMarker, HiOutlineLocationMarker, HiOutlineDotsHorizontal } from 'react-icons/hi';
import { FaPaintBrush } from 'react-icons/fa';
import { SlLayers } from 'react-icons/sl';

/**
 * @remarks
 * ButtonType Enum은 버튼이 가질 수 있는 모든 종류를 정의합니다.
 * @example
 * const buttonType = ButtonType.OPEN;
 */
export enum ButtonType {
  CLOSE = 'CLOSE', // 메뉴 닫기 버튼
  OPEN = 'OPEN', // 메뉴 열기 버튼
  START_MARKER = 'START_MARKER', // 출발지 설정 버튼
  DESTINATION_MARKER = 'DESTINATION_MARKER', // 도착지 설정 버튼
  LINE_DRAWING = 'LINE_DRAWING', // 경로 그리기 버튼
}

/**
 * @remarks
 * 이 객체는 ButtonType Enum의 각 항목에 대응하는 아이콘을 매핑합니다.
 * @example
 * const icon = IconType[ButtonType.START_MARKER]; // 출발지 설정 아이콘
 */
export const IconType = {
  CLOSE: SlLayers, // 닫기 버튼 아이콘
  OPEN: HiOutlineDotsHorizontal, // 열기 버튼 아이콘
  START_MARKER: HiLocationMarker, // 출발지 설정 아이콘
  DESTINATION_MARKER: HiOutlineLocationMarker, // 도착지 설정 아이콘
  LINE_DRAWING: FaPaintBrush, // 경로 그리기 아이콘
};

/**
 * @remarks
 * ToolCategory 배열은 각 저작도구에 대한 정보를 담고 있습니다.
 * 각 툴은 버튼 타입, 설명, 아이콘을 포함합니다.
 * 이 배열은 버튼의 목록을 정의하고, 이후 툴을 확장할 때 유용합니다.
 * 또한, OPEN과 CLOSE 등 저작 도구가 아닌 종류는 제외합니다.
 * @example
 * const tool = ToolCategory[0];
 */
export const ToolCategory = [
  {
    type: ButtonType.LINE_DRAWING, // 경로 그리기 툴
    description: '경로 그리기', // 툴 설명
    icon: IconType.LINE_DRAWING, // 툴 아이콘
  },
  {
    type: ButtonType.START_MARKER, // 출발지 설정 툴
    description: '출발지 설정', // 툴 설명
    icon: IconType.START_MARKER, // 툴 아이콘
  },
  {
    type: ButtonType.DESTINATION_MARKER, // 도착지 설정 툴
    description: '도착지 설정', // 툴 설명
    icon: IconType.DESTINATION_MARKER, // 툴 아이콘
  },
];
