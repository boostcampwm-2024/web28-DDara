import { useRef } from 'react';
import { ICanvasRefMethods } from '@/component/canvas/Canvas.tsx';
import { IMapObject, IMapRefMethods } from '@/component/maps/Map.types.ts';

// TODO:  리팩토룅 시 null을 처리하기
interface IUseEventHandlers {
  (
    canvasElement: HTMLCanvasElement | null,
    canvasRefMethods: ICanvasRefMethods | null,
    mapElement: HTMLElement | null,
    mapRefMethods: IMapRefMethods | null,
    mapObject: IMapObject | null, // 비동기 로딩 시 null로 처리가 될 수 있어서 예외처리 필요
  ): {
    handleClick: (event: React.MouseEvent) => void;
    handleMouseDown: (event: React.MouseEvent) => void;
    handleMouseMove: (event: React.MouseEvent) => void;
    handleMouseUp: (event: React.MouseEvent) => void;
  };
}

interface IMouseEventState {
  isMouseDown: boolean;
  mouseDownPosition: { x: number; y: number };
  // mouseMovePosition: { x: number; y: number };
  mouseDeltaPosition: { x: number; y: number };
}

const MouseEventStateInitialValue = {
  isMouseDown: false,
  mouseDownPosition: { x: 0, y: 0 },
  // mouseMovePosition: { x: 0, y: 0 },
  mouseDeltaPosition: { x: 0, y: 0 },
};

export const useEventHandlers: IUseEventHandlers = (
  canvasElement,
  canvasRefMethods,
  mapElement,
  mapRefMethods,
  mapObject,
) => {
  // if (!canvasElement || !canvasElement || !mapElement || !mapRefMethods || !mapObject)
  //   throw new Error('🚀 useEventHandler error : null 값이 포함되어 있습니다.');

  const mouseEventState = useRef<IMouseEventState>({ ...MouseEventStateInitialValue });

  const handleClick = (event: React.MouseEvent) => {
    mapRefMethods?.onMouseClickHandler(event);
    canvasRefMethods?.onMouseClickHandler(event);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    if (!mapElement || !canvasElement) return;
    mouseEventState.current.isMouseDown = true;
    mouseEventState.current.mouseDownPosition = { x: event.clientX, y: event.clientY };
    canvasRefMethods?.onMouseDownHandler(event);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!mapElement || !canvasElement || !mouseEventState.current.isMouseDown) return;

    // TODO: 쓰로틀링 걸기
    mouseEventState.current.mouseDeltaPosition = {
      x: -(event.clientX - mouseEventState.current.mouseDownPosition.x),
      y: -(event.clientY - mouseEventState.current.mouseDownPosition.y),
    };

    // TODO: 범용 지도에 따른 Refactoring 필요, 우선은 네이버 지도에 한해서만 수행
    mapObject?.panBy(
      new naver.maps.Point(
        mouseEventState.current.mouseDeltaPosition.x,
        mouseEventState.current.mouseDeltaPosition.y,
      ),
    );

    canvasRefMethods?.onMouseMoveHandler(event);
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    if (!mapElement || !canvasElement) return;
    mouseEventState.current = { ...MouseEventStateInitialValue };
    canvasRefMethods?.onMouseUpHandler(event);
  };

  return { handleClick, handleMouseDown, handleMouseMove, handleMouseUp };
};
