import classNames from 'classnames';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useDrawing } from '@/hooks/useDrawing.ts';
import { usePanning } from '@/hooks/usePanning.ts';
import { useZoom } from '@/hooks/useZoom.ts';
import { MdArrowCircleLeft, MdArrowCircleRight } from 'react-icons/md';
import { useUndoRedo } from '@/hooks/useUndoRedo.ts';
import { ButtonState } from '@/component/common/enums.ts';
import { useFloatingButton } from '@/hooks/useFloatingButton.ts';
import { FloatingButton } from '@/component/common/floatingbutton/FloatingButton.tsx';

interface ICanvasProps {
  className?: string;
  // onClick?: () => void;
  // onMouseDown?: () => void;
  // onMouseUp?: () => void;
  // onMouseMove?: () => void;
}

interface IPoint {
  x: number;
  y: number;
}

// 네이버 지도 기준 확대/축소 비율 단계
const NAVER_STEP_SCALES = [
  100, 100, 100, 100, 100, 100, 50, 30, 20, 10, 5, 3, 1, 0.5, 0.3, 0.1, 0.05, 0.03, 0.02, 0.01,
  0.005,
];

// 선의 굵기 상수
const LINE_WIDTH = 2;
// 선의 색 상수
const STROKE_STYLE = 'black';
// 지도의 처음 확대/축소 비율 단계 index
const INITIAL_ZOOM_INDEX = 12;

export interface ICanvasRefMethods {
  getCanvasElement: () => HTMLCanvasElement | null;
  onMouseClickHandler: (event: React.MouseEvent) => void;
  onMouseDownHandler: (event: React.MouseEvent) => void;
  onMouseMoveHandler: (event: React.MouseEvent) => void;
  onMouseUpHandler: (event: React.MouseEvent) => void;
}

export const Canvas = forwardRef<ICanvasRefMethods, ICanvasProps>((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const { points, addPoint, undo, redo, undoStack, redoStack } = useUndoRedo([]);
  const [startPoint, setStartPoint] = useState<IPoint | null>(null);
  const [endPoint, setEndPoint] = useState<IPoint | null>(null);
  const { isMenuOpen, toolType, toggleMenu, handleMenuClick } = useFloatingButton();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }, []);

  const { draw, scaleRef, viewPosRef } = useDrawing({
    canvasRef,
    points,
    startPoint,
    endPoint,
    lineWidth: LINE_WIDTH,
    strokeStyle: STROKE_STYLE,
    initialScale: NAVER_STEP_SCALES[INITIAL_ZOOM_INDEX],
  });

  const { handleMouseMove, handleMouseDown, handleMouseUp } = usePanning({ viewPosRef, draw });
  const { handleWheel } = useZoom({
    scaleRef,
    viewPosRef,
    draw,
    stepScales: NAVER_STEP_SCALES,
    initialZoomIndex: INITIAL_ZOOM_INDEX,
  });

  const handleCanvasClick = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left - viewPosRef.current.x) / scaleRef.current;
    const y = (e.clientY - rect.top - viewPosRef.current.y) / scaleRef.current;

    switch (toolType) {
      case ButtonState.LINE_DRAWING:
        addPoint({ x, y });
        break;
      case ButtonState.START_MARKER:
        setStartPoint({ x, y });
        break;
      case ButtonState.DESTINATION_MARKER:
        setEndPoint({ x, y });
        break;
      default:
        addPoint({ x, y });
        break;
    }

    draw();
  };

  useImperativeHandle(ref, () => ({
    getCanvasElement: () => canvasRef.current ?? null,
    onMouseClickHandler: event => {
      handleCanvasClick(event);
    },
    onMouseDownHandler: event => {
      handleMouseDown(event);
    },
    onMouseUpHandler: () => {
      handleMouseUp();
    },
    onMouseMoveHandler: event => {
      handleMouseMove(event);
    },
  }));

  return (
    <div className="absolute h-full w-full">
      <div className="absolute left-1/2 top-[10px] z-10 flex -translate-x-1/2 transform gap-2">
        <button
          type="button"
          onClick={undo}
          disabled={undoStack.length === 0}
          className={`h-[35px] w-[35px] ${
            undoStack.length === 0 ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          <MdArrowCircleLeft size={24} />
        </button>
        <button
          type="button"
          onClick={redo}
          disabled={redoStack.length === 0}
          className={`h-[35px] w-[35px] ${
            redoStack.length === 0 ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          <MdArrowCircleRight size={24} />
        </button>
      </div>
      <canvas
        ref={canvasRef}
        className={classNames(
          'z-1000 pointer-events-none absolute h-full w-full bg-transparent',
          props.className,
        )}
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      />
      <div className="absolute">
        <FloatingButton
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          toolType={toolType}
          handleMenuClick={handleMenuClick}
        />
      </div>
    </div>
  );
});
