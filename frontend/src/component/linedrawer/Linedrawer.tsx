import React, { useRef, useState } from 'react';
import { useDrawing } from '@/hooks/useDrawing';
import { usePanning } from '@/hooks/usePanning';
import { useZoom } from '@/hooks/useZoom';

interface IPoint {
  x: number;
  y: number;
}

const NAVER_STEP_SCALES = [
  100, 50, 30, 20, 10, 5, 3, 1, 0.5, 0.3, 0.1, 0.05, 0.03, 0.02, 0.01, 0.005,
];
const LINE_WIDTH = 2;
const STROKE_STYLE = 'black';

export const Linedrawer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<IPoint[]>([]);

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
    setPoints(prevPoints => [...prevPoints, { x, y }]);
  };

  return (
    <canvas
      ref={canvasRef}
      width="800"
      height="600"
      style={{ border: '1px solid', cursor: 'crosshair' }}
      onClick={handleCanvasClick}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    />
  );
};
