/**
 * @remarks
 * ButtonState Enum은 버튼이 가질 수 있는 모든 종류를 정의합니다.
 * @example
 * const buttonState = ButtonState.OPEN;
 */
export enum ButtonState {
  CLOSE = 'CLOSE', // 메뉴 닫기 버튼
  OPEN = 'OPEN', // 메뉴 열기 버튼
  START_MARKER = 'START_MARKER', // 출발지 설정 버튼
  DESTINATION_MARKER = 'DESTINATION_MARKER', // 도착지 설정 버튼
  LINE_DRAWING = 'LINE_DRAWING', // 경로 그리기 버튼
}
