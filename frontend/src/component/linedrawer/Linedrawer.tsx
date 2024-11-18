import React, { useRef } from 'react';
import { useDrawing } from '@/hooks/useDrawing';
import { usePanning } from '@/hooks/usePanning';
import { useZoom } from '@/hooks/useZoom';
import { MdArrowCircleLeft, MdArrowCircleRight } from 'react-icons/md';
import { useUndoRedo } from '@/hooks/useUndoRedo';

const NAVER_STEP_SCALES = [
  100, 50, 30, 20, 10, 5, 3, 1, 0.5, 0.3, 0.1, 0.05, 0.03, 0.02, 0.01, 0.005,
];
const LINE_WIDTH = 2;
const STROKE_STYLE = 'black';

export const Linedrawer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { points, addPoint, undo, redo, undoStack, redoStack } = useUndoRedo([]);

  const { draw, scaleRef, viewPosRef } = useDrawing({
    canvasRef,
    points,
    lineWidth: LINE_WIDTH,
    strokeStyle: STROKE_STYLE,
  });
  const { handleMouseMove, handleMouseDown, handleMouseUp } = usePanning({ viewPosRef, draw });
  const { handleWheel } = useZoom({
    scaleRef,
    viewPosRef,
    draw,
    stepScales: NAVER_STEP_SCALES,
  });

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left - viewPosRef.current.x) / scaleRef.current;
    const y = (e.clientY - rect.top - viewPosRef.current.y) / scaleRef.current;
    addPoint({ x, y });
  };

  return (
    <div className="relative h-[600px] w-[800px]">
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
        width="800"
        height="600"
        className="cursor-crosshair border border-gray-300"
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      />
    </div>
  );
};
