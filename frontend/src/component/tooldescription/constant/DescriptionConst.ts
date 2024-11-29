import { ButtonState } from '@/component/common/enums';

export enum DescriptionText {
  CLOSE = '',
  OPEN = '',
  START_MARKER = '출발지를 설정합니다.\n터치를 해서 출발 지점을 선택해주세요.',
  DESTINATION_MARKER = '도착지를 설정합니다.\n터치를 해서 도착 지점을 선택해주세요.',
  LINE_DRAWING = '경로를 설정합니다.\n터치를 해서 경로를 그려주세요.',
}

// 매핑 객체로 연결
export const ButtonStateDescriptions: Record<ButtonState, DescriptionText> = {
  [ButtonState.CLOSE]: DescriptionText.CLOSE,
  [ButtonState.OPEN]: DescriptionText.OPEN,
  [ButtonState.START_MARKER]: DescriptionText.START_MARKER,
  [ButtonState.DESTINATION_MARKER]: DescriptionText.DESTINATION_MARKER,
  [ButtonState.LINE_DRAWING]: DescriptionText.LINE_DRAWING,
};
