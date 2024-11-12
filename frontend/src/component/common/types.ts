import { FaPaintBrush } from 'react-icons/fa';
import { HiLocationMarker, HiOutlineDotsHorizontal, HiOutlineLocationMarker } from 'react-icons/hi';
import { SlLayers } from 'react-icons/sl';
import { ButtonType } from './enums';

/**
 * IconType 객체는 각 버튼 타입에 해당하는 아이콘 컴포넌트를 매핑합니다.
 * @type {Record<ButtonType, React.ComponentType>}
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
